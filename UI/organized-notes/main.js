const {app, BrowserWindow} = require('electron');

let appWindow;
	
function createWindow () {     
	appWindow = new BrowserWindow();
    appWindow.removeMenu();
    appWindow.maximize();
	appWindow.loadURL('http://localhost:4200');

    appWindow.on('closed', function (){
        appWindow = null
    })
} 

app.whenReady().then(()=>{
    createWindow()
})