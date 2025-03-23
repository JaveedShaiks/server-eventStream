# server-eventStream

Sends the list of items in set of timeinterval, access and send the data as stream. Same api can be utlised as eventSource in the FE application


start using file : node livestream.js

----acessing from FE
use you can start and server and replace port number in the FE react applciaion: 

   const eventSource = new EventSource("http://localhost:5000/events");

        eventSource.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };
