## General Notes
I have placed comments throughout the code to give some insight into the thought process, why some things were skipped, or how it could be improved upon.

1.  NodeJS project.  Selected mainly for quickness in getting this project done.
    1.  Other technologies considered - php, python, GoLang
2.  Used just a basic file reader - didn't feel it was necessary to write a better more full featured, or search for others.  Felt the task was more about the cash register than file i/o


## Answers to Question in Problem

1.  In this solution provided, changing the random divisor would be simple as changing their config
2.  The way this was designed was such that each client (if they were different than base modes) would get a child Cash Register Object.  This would allow for the oberride of the get change method if they had certain features they wanted to differ from the standard.  This would then allow the moving of features that may become common into the SuperClass when desired so that it can be used by all clients.
    1.  The changes (listed below) would be to make this object come back from a client factory.
3.  A new client in a new area would be easy to on board with this solution.  Each Client config allows for the definition of what denominations should be handled for.  This solution also makes it easy to add additional currencies (50's, 100's, etc).

## How to make this better

1.  Better Error Handling - while there is error handling, there should be extensive data validation, and error handling of more situations given the time
2.  Refactor a few of the common methods.  While there is not a ton of duplication, there are 2-3 places I could refactor given the time.
3.  Use of a data storage for client configs, etc.  Remove hard coding
4.  Client Register factory - instead of creation of the one Client Register it would call a factory to get the correct Cash Register client object
5.  Creation of additional objects - would help for validation and just general OOP style practices.  For example a denomination object.
6.  Better console logging - or more of it, plus some log handling possibly
