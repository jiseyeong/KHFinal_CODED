import React from 'react';
import style from './DMPage.module.scss';
import { Stomp } from '@stomp/stompjs';
import { useEffect, useState } from 'react';

const DMPage = () => {

  var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('ws://192.168.0.38:9999/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/chat/DM', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
    });
    
    displayStompObject();
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

function sendName() {
 stompClient.send("/pub/send", {}, JSON.stringify({
  'name' : $("#name").val()
 }));
}


$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

}

export default DMPage;
