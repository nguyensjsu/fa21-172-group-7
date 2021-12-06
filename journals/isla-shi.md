# Individual Journal

Each week should include:
1. A snapshot (point-in-time) image of the Team's Task Board highlighting which "Card" you worked on
2. A discussion of your accomplishments that week with a list of links to your Code Commits and PRs.
3. A discussion of the challenges you faced that week and how your resolved those issues.


## Week 1 (Nov 12 - Nov 17)
Initially I was in charge of brief UI mockups for the front end/front office's interface. Since I had prior experience in working in Adobe XD, that's what I used to create low-fidlity mock-ups. 

![image](https://user-images.githubusercontent.com/46005300/144808870-8cdf7c73-537c-44c5-8bf0-7b5006b3178d.png)

It seemed like my other team members were able to replicate the mockups quite well, and I appreciate them for that. 

Here are the images for the mockups in full view:

Basic browsing inventory page (user's view):
![image](https://user-images.githubusercontent.com/46005300/144809123-44321522-3ec7-427c-ab14-28056d36ddc6.png)

Viewing the inventory (backend view):
![image](https://user-images.githubusercontent.com/46005300/144809177-eb9bbae0-6b73-4b09-9233-0bf8feed49b4.png)

Payments view (user's view): 
![image](https://user-images.githubusercontent.com/46005300/144809217-f78fad98-2018-4082-a5ff-22397c00c328.png)


## Week 2 (Nov 18 - Nov 23)
Messed around the the front end mostly, making a footer was not as easy as I expected, but I managed to get a decent reference from this video: https://youtu.be/g459Eia-bxw 
![image](https://user-images.githubusercontent.com/46005300/144807528-936edd40-e567-4dfc-98e8-18271c3c7f30.png)

I decided that the colorscheme for the site would just be a default blue and white. I tweaked with some of the color fonts to make this kind of color scheme, although I really wish I could have looked into ReactJS designing so it could look more visually appealing overall. 

Unfortunately I was not able to center the columns or get them to be formatted like columns. It wasn't until much later that I should have looked into the grid structure for ReactJS. While ReactJS rendering is similar to HTML programming, there were quite a few differences I was unaware of. For future reference this was a basic guide: https://www.w3schools.com/REACT/DEFAULT.ASP 

## Week 3 (Nov 24 - Nov 30)
Added RabbitMQ to the mix, I did end up reusing a majority of my code given from Lab 9: RabbitMQ. It originally took a couple tries to get it working but after some renaming and carefully deciding what was needed, I got it to compile at the very least. 

![image](https://user-images.githubusercontent.com/46005300/144909690-246abd3b-d118-4a45-987a-9b45231eddd8.png)

I made a separate file holding all the RabbitMQ code and setup, and one reason why it would not originally compile was because I had to manually add the dependecy. When generating Spring projects, you can add certain dependencies, but I eventually figured out that whoever in my team generated this first did not have RabbtiMQ in mind. As a result I had to go into the build.gradle source file to manually the dependency. 

`testImplementation 'org.springframework.amqp:spring-rabbit-test'`

![image](https://user-images.githubusercontent.com/46005300/144915635-b5696907-2b03-4436-8604-591ec5c302a8.png)


## Week 4 (Dec 1 - )

Made the cloud architecture diagram, as a part of the requirements. Link to the Lucidchart edit can be found here: https://lucid.app/lucidchart/a45fd2ae-2b7f-47ef-9027-b2a67fc748f1/edit?viewport_loc=-344%2C235%2C1240%2C577%2C0_0&invitationId=inv_d123a33f-a130-4779-8608-9ac95ed2b50a 

![image](https://user-images.githubusercontent.com/46005300/144915892-d5494ac9-2270-46ea-a45a-5a8e882e8858.png)

