//Cambiar por ip del Host 
//Ejemplo: 200.84.182.249:9300
var ipPuerto = prompt('Ingrese ip:puerto', '200.84.182.249:9300');
console.log(ipPuerto);
var Server = new FancyWebSocket('ws://' + ipPuerto);
var time = 0;

function randomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCurrentTime()
{
    return Math.round((new Date()).getTime() / 1000);
}

function roleada()
{
    if(Maths.abs(time - getCurrentTime()) > 3)
    {
        time = getCurrentTime();
    	var dado = document.getElementById("tipo").value;
        var cant = document.getElementById("cant").value;
    	
        var formattedString = '<div class="text-center container well">';
        var sum = 0;
        dado = dado.substring(1, dado.length);
        
        for(var i = 0; i < cant; i++)
        {
            var r = randomInt(1, dado);
            formattedString += '<font size="4">' + r + '</font>';
            if((i+1) % 3 == 0) formattedString += '<br>';
            else if(i != cant - 1) formattedString += ' - ';
            sum += r;
        }

        formattedString += '<br><h2 class="jumbotron">' + getFigurilla(dado) + sum + '</h2></div>';
        log(formattedString);
    	send(formattedString);
        return(false);
    }
}

function getFigurilla(c){
    switch(c){
        case '4':
            return('<span class="big-dice icon-Dice-d4-Opaque"></span>');
            break;
        case '6':
            return('<span class="big-dice icon-Dice-d6-Opaque"></span>');
            break;
        case '8':
            return('<span class="big-dice icon-Dice-d8-Opaque"></span>');
            break;
        case '10':
            return('<span class="big-dice icon-Dice-d10-Opaque"></span>');
            break;
        case '12':
            return('<span class="big-dice icon-Dice-d12-Opaque"></span>');
            break;
        case '20':
            return('<span class="big-dice icon-Dice-d20-Opaque"></span>');
            break;
    }
}

function log(text)
{
    var k = document.getElementById('show');
    k.innerHTML = text;
}

function send(text)
{
    Server.send('message', text);
}

console.log('Connecting...');
    
//Let the user know we're connected
Server.bind('open', function()
{
    console.log("Connected.");
});

//OH NOES! Disconnection occurred.
Server.bind('close', function(data)
{
    console.log("Disconnected.");
});

//Log any messages sent from server
Server.bind('message', function(payload)
{
    time = getCurrentTime();
    log(payload);
});

Server.connect();