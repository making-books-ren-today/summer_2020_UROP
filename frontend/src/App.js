// import logo from "./logo.svg";
import React from "react";
import "./App.css";

function App() {
	return (
		<div>
			<div id='layout' class='pure-g'>
				<div class='sidebar pure-u-1 pure-u-md-1-4 body'>
					<div class='header'>
						<h1 class='brand-title'>Mused</h1>
						<h2 class='brand-tagline'>Make exhibits, not websites</h2>

						<nav class='nav'>
							<ul class='nav-list'>
								<li class='nav-item'>
									<a class='pure-button' href=''>
										Create
									</a>
								</li>
								<li class='nav-item'>
									<a class='pure-button post-category post-category-js' href=''>
										Explore
									</a>
								</li>
								<li class='nav-item'>
									<a class='pure-button post-category post-category-js' href=''>
										About
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div class='content'>
					<div>
						<div class='search-container'>
							<input placeholder='Search' class='input'></input>
						</div>
						<div class='posts'>
							<h1 class='content-subhead'>Forum</h1>
							<section class='post'>
								<header class='post-header'>
									<h2 class='post-title'>Web project made easy</h2>

									<p class='post-meta'>
										By{" "}
										<a href='#' class='post-author'>
											Emma, Hizami, Ian
										</a>{" "}
										under{" "}
										<a class='post-category post-tag-green' href='#'>
											Intro
										</a>{" "}
										<a class='post-category post-tag-blue' href='#'>
											Tutorial
										</a>
									</p>
								</header>

								<div class='post-description'>
									<p>
										Developing a website is hard. Making good-looking websites
										are even harder. Mused is here to help. Check out our
										comprehensive user guide and get inspired. Add maps,
										timeline, storymaps to make your website colorful. Edit and
										see immediate changes in the same window effortlessly. Start
										now by clicking on the create button on the left.
									</p>
								</div>
							</section>
						</div>
						<h1 class='content-subhead'></h1>

						<div class='posts'>
							<section class='post'>
								<header class='post-header'>
									<h2 class='post-title'>Everything you need to get started</h2>

									<p class='post-meta'>
										By{" "}
										<a class='post-author' href='#'>
											Ian Lee
										</a>{" "}
										under{" "}
										<a class='post-category post-tag-orange' href='#'>
											Quick start
										</a>
									</p>
								</header>

								<div class='post-description'>
									<p>
										If you're looking for random paragraphs, you've come to the
										right place. When a random word or a random sentence isn't
										quite enough, the next logical step is to find a random
										paragraph. We created the Random Paragraph Generator with
										you in mind. The process is quite simple. Choose the number
										of random paragraphs you'd like to see and click the button.
										Your chosen number of paragraphs will instantly appear.
									</p>
								</div>
							</section>
							<h1 class='content-subhead'></h1>
							<div class='posts'>
								<section class='post'>
									<header class='post-header'>
										<h2 class='post-title'>Book-making in the Renaissance</h2>

										<p class='post-meta'>
											By{" "}
											<a class='post-author' href='#'>
												Erica Zimmer
											</a>{" "}
											under{" "}
											<a class='post-category post-tag-red' href='#'>
												MIT
											</a>
											<a class='post-category post-tag-purple' href='#'>
												Recommended
											</a>
										</p>
									</header>

									<div class='post-description'>
										<p>
											Above are a few examples of how the random paragraph
											generator can be beneficial. The best way to see if this
											random paragraph picker will be useful for your intended
											purposes is to give it a try. Generate a number of
											paragraphs to see if they are beneficial to your current
											project.
										</p>
									</div>
								</section>
							</div>
							<h1 class='content-subhead'></h1>
							<div class='posts'>
								<section class='post'>
									<header class='post-header'>
										<h2 class='post-title'>
											Help! Stuck with adding JS Storymap to Mused
										</h2>

										<p class='post-meta'>
											By{" "}
											<a class='post-author' href='#'>
												Bob Dylan
											</a>{" "}
											under{" "}
											<a class='post-category post-tag-black' href='#'>
												Bug
											</a>
											<a class='post-category post-tag-yellow' href='#'>
												Feature
											</a>
											<a class='post-category post-tag-dark-blue' href='#'>
												Meta data
											</a>
										</p>
									</header>

									<div class='post-description'>
										<p>
											There are usually about 200 words in a paragraph, but this
											can vary widely. Most paragraphs focus on a single idea
											that's expressed with an introductory sentence, then
											followed by two or more supporting sentences about the
											idea. A short paragraph may not reach even 50 words while
											long paragraphs can be over 400 words long, but generally
											speaking they tend to be approximately 200 words in
											length.
										</p>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
