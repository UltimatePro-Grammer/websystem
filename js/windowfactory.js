class Window {
    /**
     * Constructor
     * @param {Minimum Width (px)} width 
     * @param {Minimum Height (px)} height 
     * @param {Title of window} title 
     * @param {Default Width (em)} defaultWidth 
     * @param {Default Height (em)} defaultHeight 
     * @param {Default X Position} x 
     * @param {Default Y Position} y 
     */
    constructor(width, height, title, defaultWidth=30, defaultHeight=30, x=3, y=3, keepAspectRatio=false) {
      let window = document.createElement("div");
        window.classList.add("window", "absolute", "window-slow");
        window.style.top = y+"em";
        window.style.left = x+"em";

        let header = document.createElement("div");
        header.classList.add("window-header", "unselectable");

        let titleText = document.createElement("a");
        titleText.innerText = title;

        // let back = document.createElement("div");
        // back.classList.add("file-back-container", "unselectable", "no-move");

        // let backImg = document.createElement("img");
        // backImg.classList.add("file-back");
        // backImg.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTMuMDI1IDFsLTIuODQ3IDIuODI4IDYuMTc2IDYuMTc2aC0xNi4zNTR2My45OTJoMTYuMzU0bC02LjE3NiA2LjE3NiAyLjg0NyAyLjgyOCAxMC45NzUtMTF6Ii8+PC9zdmc+";
        


        let close = document.createElement("div");
        close.classList.add("close", "unselectable", "no-move");
        
        let resize = document.createElement("div");
        resize.classList.add("resize");

        // put it all together
        // back.appendChild(backImg);
        // header.appendChild(back);

        header.appendChild(titleText);
        header.appendChild(close);

        window.appendChild(header);
        window.appendChild(resize);
        document.body.appendChild(window);

        this.lastChildNoChildren = window.lastChild;

        setTimeout(()=>{
          window.style.opacity = "1";
        }, 10);
        

        this.configureElement(window, header, resize, close, defaultWidth, defaultHeight, width, height, keepAspectRatio);

        this.window = window;
        this.window.header = header;
        this.window.titleText = titleText;

        // Focus/Unfocus
        this.dispatchFocus(); // when new window is opened focus by default

        this.window.onmousedown = ()=>{
          this.dispatchFocus();
        }

        document.addEventListener('window-focus', (event)=>{
          if(this.focused()) {
            if(event.window == this.window) {
              this.giveFocus();
            } else {
              this.removeFocus();
            }
          } else {
            this.removeFocus();
          }
        });
    }

    getWindow() {
      return this.window;
    }

    getHeader() {
      return this.window.header;
    }
    
    getHeaderText() {
      return this.window.titleText;
    }

    getWindowWidth() {
      return this.window.style.width;
    }

    getWindowHeight() {
      return this.window.style.height;
    }

    clear() {
      while(this.window.lastChild != this.lastChildNoChildren) {
        this.window.removeChild(this.window.lastChild);
      }
    }

    setTitle(newTitle) {
      this.window.titleText.innerText = newTitle;
    }

    setBackgroundColor(color) {
      this.window.style.backgroundColor = color;
    }

    // Makes a string for the window. Useful for needing a key for an object which is the window.
    makeString() {
      this.uniqueId = "window-"+Math.random();
      return this.uniqueId;
    }

    focused() {
      return this.hasFocus;
    }

    giveFocus() {
      this.hasFocus = true;
      this.window.style.zIndex = 10;
    }

    removeFocus() {
      this.hasFocus = false;
      if(this.window.style.zIndex > 2) {
        this.window.style.zIndex -= 1;
      }
    }

    dispatchFocus() {
      this.giveFocus(); // give opened window focus
      focusEvent.window = this.window;
      document.dispatchEvent(focusEvent);
    }

    /**
     * Make window able to be dragged and resized.
     * @param {Window} elmnt 
     * @param {Header} header 
     * @param {Resizer} resizeElement 
     * @param {Close button} close
     * @param {Default width of window} defaultHeight 
     * @param {Default height of window} defaultWidth 
     * @param {Minimum width of window} minWidth 
     * @param {Minimum Height of window} minHeight 
     */
    configureElement(elmnt, header, resizeElement, close, defaultWidth, defaultHeight, minWidth=200, minHeight=200, keepAspectRatio=false) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      elmnt.style.width = defaultWidth+"em";
      elmnt.style.height = defaultHeight+"em";
      if (header) {
        // if present, the header is where you move the DIV from:
        header.onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV: 
        elmnt.onmousedown = dragMouseDown;
      }
      resizeElement.onmousedown = resize;
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        if(!e.target.classList.contains("no-move")) {
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        } else {
          if(e.target == close) {
            // close window
            elmnt.classList.remove("window-slow");
            elmnt.classList.add("window-fast");
            elmnt.style.opacity = "0";
            setTimeout(()=>{
              elmnt.remove();
            }, 150);
          }
        }
        
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }

      // not w3schools
      function resize(e) {
          e = e || window.event;
          e.preventDefault();
          document.onmouseup = closeDragElement
          document.onmousemove = resizeMove;
      }
      var oldWidth = defaultWidth * em;
      var currentWidth = defaultWidth * em;
      var currentHeight = defaultHeight * em;
      function resizeMove(e) {
          e = e || window.event;
          e.preventDefault();
          let msOffset = 8; // mouse offset so it is centered
          if((e.clientX - elmnt.offsetLeft)+msOffset > minWidth) {
            if(keepAspectRatio) {
              currentWidth = (e.clientX - elmnt.offsetLeft)+msOffset;
              elmnt.style.width = currentWidth + "px";
              currentHeight += currentWidth - oldWidth;
              elmnt.style.height = currentHeight + "px";
              oldWidth = currentWidth;
            } else {
              elmnt.style.width = (e.clientX - elmnt.offsetLeft)+msOffset + "px";
            }
          } else {
            elmnt.style.width = minWidth;
          }
          if((e.clientY - elmnt.offsetTop)+msOffset > minHeight) {
            if(!keepAspectRatio) {
              elmnt.style.height = (e.clientY - elmnt.offsetTop)+msOffset + "px";
            }
          } else {
            elmnt.style.height = minHeight;
          }
          elmnt.dispatchEvent(resizeEvent);
      }
    }
    /**
     * Returns the width of the window in pixels.
     */
    getWidth() {
      return this.window.clientWidth;
    }
    /**
     * Returns the height of the window in pixels.
     */
    getHeight() {
      return this.window.clientHeight;
    }
    /**
     * Returns the width of the window in em.
     */
    getWidthInEm() {
      return this.window.clientWidth/em;
    }
    /**
     * Returns the height of the window in em.
     */
    getHeightInEm() {
      return this.window.clientHeight/em;
    }
}




// * /* EVENTS */

// Called on the window when the window gains focus
var focusEvent = new Event('window-focus');
// Called on the window when it gets resized
var resizeEvent = new Event('window-resize');


// * /* GLOBAL WINDOW THINGS */
// Right Click Menu
class RightClickMenu {
  /**
   * Adds an element to the menu. IDs are recommended.
   * Example usage:
   * RightClickMenu.addToMenu("Menu Item", ".window"); // will only show up when a window has been right clicked
   * 
   * Note that you might need to add a class to your window to be able to reference it.
   * @param {The element to be appended to the menu. If a string uses default element.} element 
   * @param {An element instance (or instances with an array) representing where to use the menu item.} usage 
   * @param {A callback to run when the element is clicked} callback
   */
  static addToMenu(element, usage, callback) {
    if(!this.usages) {
      this.usages = {};
    }
    if(typeof element == "string") {
      var text = element;
      element = document.createElement("div");
      element.innerText = text;
      element.classList.add("right-click-menu-member");
    }
    if(typeof usage == "object") { // multiple usages, use foreach.
      usage.forEach((use)=>{
        if (!this.usages[use]) {
          this.usages[use] = [];
        }
        this.usages[use].push(element);
      });
    } else {
      if (!this.usages[usage]) {
        this.usages[usage] = [];
      }
      this.usages[usage].push(element);
    }
    

    element.addEventListener("right-click-select", ()=>{
      callback();
    });
  }

  static addLineToMenu(usage) {
    var element = document.createElement("hr");
    element.classList.add("right-click-menu-member-no-hover");
    if(typeof usage == "object") { // multiple usages, use foreach.
      usage.forEach((use)=>{
        if (!this.usages[use]) {
          this.usages[use] = [];
        }
        this.usages[use].push(element);
      });
    } else {
      if (!this.usages[usage]) {
        this.usages[usage] = [];
      }
      this.usages[usage].push(element);
    }
  }

  // Appends all of the right click menu items by the selector
  static appendAllSelectedChildren(selector) {
    let elements = this.usages[selector];
    elements.forEach((element) => {
        rightClickMenu.appendChild(element);
        this.rightClickHeight += outerHeight(element)/em;
    });
    this.rightClickMenu.style.height = this.rightClickHeight+"em";
  }

  static addRightClickForClass(classString, generatedString, parent) {
    var elements = parent.querySelectorAll(classString);
    elements.forEach((element)=>{
      RightClickMenu.addContextMenuListener(element, generatedString);
      element.classList.add("right-click-added");
    });
  }

  static updateRightClickForClass(classString, generatedString, parent) {
    var elements = parent.querySelectorAll(classString);
    elements.forEach((element)=>{
      if(!element.classList.contains("right-click-added")) {
        RightClickMenu.addContextMenuListener(element, generatedString);
      }
    });
  }

  static addRightClickForWindow(clickWindow, generatedWindow) {
    if(!this.rightClickMenu) {
      this.rightClickMenu = rightClickMenu;
    }
    RightClickMenu.addContextMenuListener(clickWindow, generatedWindow);
  }
  
  static addContextMenuListener(clickWindow, generatedWindow) {
    clickWindow.addEventListener('contextmenu', (event)=>{
      event.preventDefault();
      if(!this.rightClickMenu.className.includes("right-click-invisible")) {
          this.rightClickTimer = 0;
          this.rightClickInterval = setInterval(()=>{
              this.rightClickTimer += 50;
          }, 50);
          // show menu
          this.rightClickMenu.classList.add("right-click-visible");
          
          // set position
          this.rightClickMenu.style.top = event.clientY+"px";
          this.rightClickMenu.style.left = event.clientX+"px";
          this.rightClickHeight = 0;
          this.rightClickMenu.style.height = "0em";

          this.rightClickMenu.innerHTML = "";
          RightClickMenu.appendAllSelectedChildren(generatedWindow);
          
          var pointerHandle = function pointerUpEventHandler(event) {
              // run callback of clicked
              let children = this.rightClickMenu.children;
              children = Array.from(children);
              children.forEach((element)=>{
                if(isHover(element)) {
                  element.dispatchEvent(rightClickSelect);
                }
              });
              // stop timer
              clearInterval(this.rightClickInterval);
              // get timer
              if(this.rightClickTimer > 200) {
                  this.rightClickMenu.classList.add("right-click-slow");
                  this.rightClickMenu.classList.add("right-click-invisible");
                  this.rightClickMenu.classList.remove("right-click-visible");
                  setTimeout(()=>{
                      this.rightClickMenu.classList.remove("right-click-invisible");
                      this.rightClickMenu.classList.remove("right-click-slow");
                      this.rightClickMenu.innerHTML = "";
                  }, 400);
              } else {
                  // remove on click
                  var removeOnClick = function removeOnceClicked() {
                      // run callback of clicked
                      let children = this.rightClickMenu.children;
                      children = Array.from(children);
                      children.forEach((element)=>{
                        if(isHover(element)) {
                          element.dispatchEvent(rightClickSelect)
                        }
                      });
                      // ? Make below a function
                      this.rightClickMenu.classList.add("right-click-slow");
                      this.rightClickMenu.classList.add("right-click-invisible");
                      this.rightClickMenu.classList.remove("right-click-visible");
                      setTimeout(()=>{
                          this.rightClickMenu.classList.remove("right-click-invisible");
                          this.rightClickMenu.classList.remove("right-click-slow");
                          this.rightClickMenu.innerHTML = "";
                      }, 400);
                      document.body.removeEventListener('pointerdown', removeOnClick, false);
                  }.bind(this);

                  document.body.addEventListener('pointerdown', removeOnClick, false);
              }
              // remove listener
              document.body.removeEventListener('pointerup', pointerHandle, false);
          }.bind(this);

          document.body.addEventListener('pointerup', pointerHandle, false);
      }
    });
  }
  
}
var rightClickMenu = document.createElement("div");
rightClickMenu.classList.add("right-click", "right-click-fast", "unselectable", "absolute");
document.body.appendChild(rightClickMenu);

// EVENTS

// Called when an element is selected from a right click.
// Handled internally- runs callback given in addToMenu function.
var rightClickSelect = new Event("right-click-select");