var filesystem = localforage.createInstance({
    name: "WebSystem",
    description: "The main storage system for WebSystem"
});
filesystem.ready().then(function() {
    if(filesystem.driver() == "LocalStorage") {
        alert("The browser you are currently using will limit the amount of space you can use. This may cause data loss. Switching to a recent browser is highly recommended.");
    }
}).catch(function (e) {
    console.log(e); // `No available storage method found.`
});