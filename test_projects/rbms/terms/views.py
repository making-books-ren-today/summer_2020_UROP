from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.views.generic import CreateView, UpdateView, DeleteView, DetailView

import csv 
import requests 
import xml.etree.ElementTree as ET 
# Create your views here.

def loadRSS(): 
  url = 'https://raw.githubusercontent.com/LD4P/arm/master/tools/rbms_vocabs/data/binding_alpha_2018-05.xml'
  resp = requests.get(url) 
  with open('binding.xml', 'wb') as f: 
      f.write(resp.content) 
    
  url = 'https://raw.githubusercontent.com/LD4P/arm/master/tools/rbms_vocabs/data/genre_alpha_2018-05.xml'
  resp = requests.get(url) 
  with open('genre.xml', 'wb') as f: 
      f.write(resp.content) 

  url = 'https://raw.githubusercontent.com/LD4P/arm/master/tools/rbms_vocabs/data/paper_alpha_2018-05.xml'
  resp = requests.get(url) 
  with open('paper.xml', 'wb') as f: 
      f.write(resp.content)          

  url = 'https://raw.githubusercontent.com/LD4P/arm/master/tools/rbms_vocabs/data/printing_and_publishing_alpha_2018-05.xml'
  resp = requests.get(url) 
  with open('printing_and_publishing.xml', 'wb') as f: 
      f.write(resp.content) 

  url = 'https://raw.githubusercontent.com/LD4P/arm/master/tools/rbms_vocabs/data/provenance_alpha_2018-05.xml'
  resp = requests.get(url) 
  with open('provenance.xml', 'wb') as f: 
      f.write(resp.content) 

  url = 'https://raw.githubusercontent.com/LD4P/arm/master/tools/rbms_vocabs/data/relationship_designators_alpha_2018-05.xml'
  resp = requests.get(url) 
  with open('relationship_designators.xml', 'wb') as f: 
      f.write(resp.content) 

  url = 'https://raw.githubusercontent.com/LD4P/arm/master/tools/rbms_vocabs/data/type_alpha_2018-05.xml'
  resp = requests.get(url) 
  with open('type.xml', 'wb') as f: 
      f.write(resp.content) 

class Term:
    def __init__(self):
        self.id = None
        self.name = ''
        self.type = '' # 'descriptor' or 'nondescriptor'
        self.parent = None
        self.children = dict()
        self.related = dict()
        self.use = None
        self.uf = dict()

def parseXML(xmlfile, category): 
  
    # create element tree object 
    tree = ET.parse(xmlfile) 
    
    # get root element 
    root = tree.getroot() 
  
    agenda = root.findall('./CONCEPT')
    terms = dict()
    rootTerm = Term()
    rootTerm.name = category
    
    for concept in agenda:
        descriptor = concept.findall('DESCRIPTOR')
        if descriptor:
            name = descriptor[0].text
                
        nondescriptor = concept.findall('NON-DESCRIPTOR')
        if nondescriptor:
            name = nondescriptor[0].text
        
        term = Term()
        term.name = name
        terms[name] = term
    
    for concept in agenda:  
        descriptor = concept.findall('DESCRIPTOR')
        if descriptor:
            descriptor = descriptor[0].text
                
        nondescriptor = concept.findall('NON-DESCRIPTOR')
        if nondescriptor:
            nondescriptor = nondescriptor[0].text
        
        # DESCRIPTOR terms are primary terms used for description
        # NON-DESCRIPTOR terms are usually uncommonly-used synonyms of primary terms

        # BT - Broader Term (i.e. category containing this)
        broader = concept.find('BT')
        # NT - Narrower Term (i.e. a subset of this category)
        narrower = concept.findall('NT')
        # RT - Related Term (terms that are related somehow)
        related = concept.findall('RT')
        # USE indicates the common primary name for the term
        use = concept.find('USE')
        # UF indicates less common names used for the term
        used_for = concept.findall('UF')
        # TNR - Term Number
        term_number = concept.find('TNR')

        # Notes Fields:
        # SC - Source Code - Overarching category w/ code (i.e. rbbin Binding Terms)
        # CM - Comment Field - General or miscellaneous comments
        # HN - History Note - Notes about historical aspects (such as previous names) 
        # SN - Scope Note - Generally defines how the term should be used

        # Other Fields:
        # STA is status of term approval (usually "Approved")
        # INP is date term was first inputted
        # APP is date term was approved
        # UPD is date term was last updated
        # NVD is ??? (unsure, though it appears to always be 2000-01-01 when used)
        
        if descriptor:
          term = terms[descriptor]
          term.type = 'descriptor'

          if broader != None:
            term.parent = terms[broader.text]
          else:
            rootTerm.children[descriptor] = term

          for item in narrower:
            term.children[item.text] = terms[item.text]

          for item in used_for:
            term.uf[item.text] = terms[item.text]
        
        elif nondescriptor:
          term = terms[nondescriptor]
          term.type = 'nondescriptor'
          term.use = terms[use.text]

        for item in related:
          term.related[item.text] = terms[item.text]
        
        term.id = term_number.text
    
           
    return terms, rootTerm
      
def bindingsView(request): 
    # load rss from web to update existing xml file 
    # loadRSS() 
  
    # parse xml file 
    terms, rootTerm = parseXML('binding.xml', 'bindings') 
    context = {'root': rootTerm}

    return render(request, 'terms/rbms.html', context)

def rbmsView(request):
  loadRSS()

  context = dict()
  if "category" in request.GET:
    category = request.GET["category"]
    terms, rootTerm = parseXML(category + '.xml', category.replace("_", " ").capitalize())
    nondescriptors = [term for term in terms.values() if term.type == 'nondescriptor']
    context = {'root': rootTerm, 'nondescriptors': nondescriptors}
    
  return render(request, 'terms/rbms.html', context)
