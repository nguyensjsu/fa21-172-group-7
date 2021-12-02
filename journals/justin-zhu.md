# Individual Journal

Each week should include:

1. A snapshot (point-in-time) image of the Team's Task Board highlighting which "Card" you worked on
2. A discussion of your accomplishments that week with a list of links to your Code Commits and PRs.
3. A discussion of the challenges you faced that week and how your resolved those issues.

## Week 1 (Nov 12 - Nov 17)
1. Snapshot
![jz-1](https://user-images.githubusercontent.com/25803515/142089946-cd1b45cd-6951-4ff3-8bf2-8efc3f4415ae.png)
2. Accomplishments
    * I had two main tasks assigned to me. One was to setup the Individual Journals and file directory. As I am able to write in my own journal here, I have been able to complete that task. I also added an Individual Team Member Journals section in the README.md to provide some explanation on what we will include in these journals. My other task was to look into integrating Kong API with our app. After doing some research and looking over Lab 8, where we worked with Kong API, I have come to the conclusion that this is something that will stay in progress until we get Docker set up. For instance, we will need to get a Docker image of the backend first in order to connect it to Kong. Once we get that, we have Lab 8 as a guide to set up our backend with Kong, so it should be really easy.
    * Commits
      * <a href="https://github.com/nguyensjsu/fa21-172-group-7/commit/a28a3c62ad332cd3c1289e5641b092fb79c7c96d">Update dependencies</a>
      * <a href="https://github.com/nguyensjsu/fa21-172-group-7/commit/60a47e2cca5bce9661e7ffdfba73f0099a8138af">Edit .gitignore</a>
      * <a href="https://github.com/nguyensjsu/fa21-172-group-7/commit/c0fcfa68e9cd1508d833fa6f5c5c0e76b1431686">Add individual journals</a>
      * <a href="https://github.com/nguyensjsu/fa21-172-group-7/commit/29f02068d7f1d6f6f85d08c18e32a2c702fa6c69">Update README.md with Individual Journals section</a>
3. Challenges
    * There really weren't any challenges. Just waiting on the next few tasks to work on now.

## Week 2 (Nov 17 - Nov 24)
1. Snapshot
![jz-2](https://user-images.githubusercontent.com/25803515/142984488-b34bb3c1-7e35-4e49-ac15-6f5b98335735.png)
2. Accomplishments
   * This week, I had four main tasks. One task was to continue looking into Kong API with our REST APIs. With Kong API, this required me to work with the backend files and Docker image configurations. As a result, this was my second task: to rename the backend files and to set up the files properly to create the Docker images. I was able to complete both of these tasks and Kong API is now fully connected to our backend. My third task was to set up the frontend routing for our team to begin frontend development of the pages. Essentially, I am setting up all the routes (/login, /register, /browse) and creating dummy pages to make it easier for everyone in our team to begin frontend development. I was able to accomplish this task as well. My last task turned into quite a big one. It was originally to implement the UI of user login/logout. But, I ended up implementing the entire user login/logout functionality. In other words, instead of only working on the frontend, I worked on both the frontend and the backend. Everything seemed to have worked properly on H2 database, and it is still in process of a PR, so we will see if there are any bugs that come up as my team checks it.
   * Notable PRs
      * <a href='https://github.com/nguyensjsu/fa21-172-group-7/pull/16'>Kong Integration and Backend File Setup</a>
      * <a href='https://github.com/nguyensjsu/fa21-172-group-7/pull/17'>React Page Routing</a>
      * <a href='https://github.com/nguyensjsu/fa21-172-group-7/pull/21'>User Register/Login/Logout</a>
3. Challenges
   * Once again, nothing too challenging really. But there were two interesting topics of note to talk about. One was during my implementation of Kong API into our app. While doing this, our frontend application required additional setup from Kong in order to communicate to it. In the console, the error had something to do with cors. In the end, I had to make use of the cors plugin in Kong API to get it working. It was a cool experience. Another topic of note was during development of Login. Register/Login requires passwords. Obviously it is insecure to just send the plaintext password over the Internet. So I had to look into encryption/hashing methods. In the end, I stumbled upon bcrypt.js, which allowed me to hash my passwords and also verify that the plaintext matched the hashed password saved in the database.

## Week 2 (Nov 24 - Dec 1)
1. Snapshot
![jz-3](https://user-images.githubusercontent.com/25803515/144363853-9d746400-992a-4b79-b227-055c4436ec27.png)

2. Accomplishments
   * As you can see there was a lot of progress made these past week. To start off, my PR for User Register/Login/Logout got approved, so that is merged in. And from there I had some designated tasks for me to work on. One was adding more code to ensure that we do not allow users to sign up for multiple accounts with the same email (i.e. duplicate emails). I was able to finish that one pretty early on. Another was conditional rendering of the navbar components and all the other buttons that users can click on to route to other pages. Basically, when the user is logged in, the button or option to login should not be allowed. The same goes for registering too. And when the user is logged out, they should not have the option to log out. This stuff all got merged Wednesday, as we met as a group that day to get all of our work merged together. After that, I had some spare time, so I decided to fix our UI up a bit. For instance, the footer wasn't in the right spot, so I made it somewhat better by sticking it near the bottom of the page. Some colors and padding were also inconsistent through the page, so I made it look better. We also split our app into front office and back office, so a lot of adjustments had to be made there as well. Finally, I did end up adding a homepage, since we didn't really have that going yet.
   * Notable PRs
      * <a href='https://github.com/nguyensjsu/fa21-172-group-7/pull/42'>Duplicate Emails and Navbar Conditional Rendering</a>
      * <a href='https://github.com/nguyensjsu/fa21-172-group-7/pull/46'>UI Changes</a>
3. Challenges
   * There weren't really any noticeable challenges this week. I would say the next step for me would be to tackle another straightforward task. However after that, I will need to help the team figure out RabbitMQ. This is where I may start experiencing some challenges.
