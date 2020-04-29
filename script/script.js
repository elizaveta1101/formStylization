/*-------------кнопка ПОДБОР----------*/
function checkBtnAction() {
    const btn = document.querySelector('.form__check-button');
    const menu = document.querySelector('.check-button__options');
    const options = menu.querySelectorAll('.check-button_option');

    btn.addEventListener('mouseover', (event) => {
        if (event.target.localName === 'button') {
            menu.addEventListener('click', (event) => {
                if (event.target !== menu) {
                    btn.textContent=event.target.textContent;
                    options.forEach((item) => {
                        if (item.textContent === event.target.textContent)
                        {
                            item.classList.add('check-button_option--selected');
                        } else {
                            item.classList.remove('check-button_option--selected');
                        }
                    });
                }                
                menu.classList.add('check-button__options--hidden');
                btn.insertAdjacentElement("beforeend", menu);
            })
        }
    })
}

/*------------------маска для телефона------------*/
function phoneMask() {
    let phone = document.querySelector('.input__tel');
    let phoneMask = new Inputmask("8-[9]{3}-[9]{3}-[9]{2}-[9]{2}");
    phoneMask.mask(phone);
}

/*------------проверка на пустое поле ввода--------------*/
function inputValidation(inputTxt) {
    if (inputTxt.type!=='password') {
        if (inputTxt.value ==='') {
            inputTxt.placeholder='Не заполнено поле';
            inputTxt.classList.add('invalid-input');
            inputTxt.nextElementSibling.classList.add('invalid-icon');
        } else {
            inputTxt.classList.add('valid-input');
            inputTxt.nextElementSibling.classList.add('valid-icon');
        }
    }
}

/*--------сброс стилевых классов при фокусе на поле------------*/
function clearClassList(inputTxt) {
    inputTxt.nextElementSibling.classList.remove('valid-icon');
    inputTxt.nextElementSibling.classList.remove('invalid-icon');
    inputTxt.classList.remove('invalid-input');
    inputTxt.classList.remove('valid-input');

}

/*-------------SELECT-------------------*/
function customSelect() {
    var customScroll = {
        aConts  : [],
        mouseY : 0,
        N  : 0,
        asd : 0, /*active scrollbar element*/
        sc : 0,
        sp : 0,
        to : 0,
        scrollbarAll: function (cont_class) {
            const cont = document.querySelectorAll(cont_class);
            cont.forEach((item) => this.scrollbar(item));
        },
        // constructor
        scrollbar : function (cont) {
            // perform initialization
            if (! customScroll.init()) return false;
            var cont_wrap = cont.cloneNode(false);
            cont_wrap.className ='scroll-wrap';
            cont_wrap.style.display="none";
            cont_wrap.style.position='relative';
            let classes = cont.classList.value.split(' ');
            for (let i=0; i< classes.length; i++) {
                switch (classes[i]) {
                    case 'form__select_size_2': 
                        cont_wrap.classList.add('form__select_size_2');
                        break;
                    case 'form__select_size_3': 
                        cont_wrap.classList.add('form__select_size_3');
                        break;
                    case 'form__select_size_4': 
                        cont_wrap.classList.add('form__select_size_4');
                        break;
                    case 'form__select_size_5': 
                        cont_wrap.classList.add('form__select_size_5');
                        break;
                    case 'form__select_size_8': 
                        cont_wrap.classList.add('form__select_size_8');
                        break;
                }
            }
            
            cont.parentNode.appendChild(cont_wrap);
            cont_wrap.appendChild(cont);
            cont.style.position = 'absolute';
            cont.style.left = '0';
            cont.style.width = '100%';
            // adding new container into array
            customScroll.aConts[customScroll.N++] = cont;
            cont.sg = false;
            //creating scrollbar child elements
            cont.st = this.create_div('customScroll_st', cont, cont_wrap);
            cont.sb = this.create_div('customScroll_sb', cont, cont_wrap);
            cont.su = this.create_div('customScroll_up', cont, cont_wrap);
            cont.sd = this.create_div('customScroll_down', cont, cont_wrap);
            // cont.st.style.display='none';
            // cont.sb.style.display='none';

            // on mouse down processing
            cont.sb.onmousedown = function (e) {
                if (! this.cont.sg) {
                    if (! e) e = window.event;
                    customScroll.asd = this.cont;
                    this.cont.yZ = e.screenY;
                    this.cont.sZ = cont.scrollTop;
                    this.cont.sg = true;
                    // new class name
                    this.className = 'customScroll_sb customScroll_sb_down';
                }
                return false;
            }
            // on mouse down on free track area - move our scroll element too
            cont.st.onmousedown = function (e) {
                if (! e) e = window.event;
                customScroll.asd = this.cont;
                customScroll.mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                for (var o = this.cont, y = 0; o != null; o = o.offsetParent) y += o.offsetTop;
                this.cont.scrollTop = (customScroll.mouseY - y - (this.cont.ratio * this.cont.offsetHeight / 2) - this.cont.sw) / this.cont.ratio;
                this.cont.sb.onmousedown(e);
            }
            // onmousedown events
            cont.su.onmousedown = cont.su.ondblclick = function (e) { customScroll.mousedown(this, -1); return false; }
            cont.sd.onmousedown = cont.sd.ondblclick = function (e) { customScroll.mousedown(this,  1); return false; }
            //onmouseout events
            cont.su.onmouseout = cont.su.onmouseup = customScroll.clear;
            cont.sd.onmouseout = cont.sd.onmouseup = customScroll.clear;
            // on mouse over - apply custom class name: customScroll_sb_over
            cont.sb.onmouseover = function (e) {
                if (! this.cont.sg) this.className = 'customScroll_sb customScroll_sb_over';
                return false;
            }
            // on mouse out - revert back our usual class name 'customScroll_sb'
            cont.sb.onmouseout  = function (e) {
                if (! this.cont.sg) this.className = 'customScroll_sb';
                return false;
            }
            // onscroll - change positions of scroll element
            cont.customScroll_onscroll = function () {
                this.ratio = (this.offsetHeight - 2 * 10) / this.scrollHeight;
                this.sb.style.top = Math.floor(10 + this.scrollTop * this.ratio) + 'px';
            }
            // scrollbar width
            cont.sw = 2;
            // start scrolling
            cont.customScroll_onscroll();
            customScroll.refresh();
            // binding own onscroll event
            cont.onscroll = cont.customScroll_onscroll;
            return cont;
        },
        // initialization
        init : function () {
            if (window.oper || (! window.addEventListener && ! window.attachEvent)) { return false; }
            // temp inner function for event registration
            function addEvent (o, e, f) {
                if (window.addEventListener) { o.addEventListener(e, f, false); customScroll.w3c = true; return true; }
                if (window.attachEvent) return o.attachEvent('on' + e, f);
                return false;
            }
            // binding events
            addEvent(window.document, 'mousemove', customScroll.onmousemove);
            addEvent(window.document, 'mouseup', customScroll.onmouseup);
            addEvent(window, 'resize', customScroll.refresh);
            return true;
        },
        // create and append div finc
        create_div : function(c, cont, cont_clone) {
            var o = document.createElement('div');
            o.cont = cont;
            o.className = c;
            cont_clone.appendChild(o);
            return o;
        },
        // do clear of controls
        clear : function () {
            clearTimeout(customScroll.to);
            customScroll.sc = 0;
            return false;
        },
        // refresh scrollbar
        refresh : function () {
            for (var i = 0, N = customScroll.N; i < N; i++) {
                var o = customScroll.aConts[i];
                o.customScroll_onscroll();
                o.sb.style.width = o.st.style.width = o.su.style.width = o.sd.style.width = o.sw + 'px';
                o.su.style.height = o.sd.style.height = '10px';
                o.sb.style.height = Math.ceil(Math.max(o.sw * .5, o.ratio * o.offsetHeight) + 1) + 'px';
            }
        },
        // arrow scrolling
        arrow_scroll : function () {
            if (customScroll.sc != 0) {
                customScroll.asd.scrollTop += 6 * customScroll.sc / customScroll.asd.ratio;
                customScroll.to = setTimeout(customScroll.arrow_scroll, customScroll.sp);
                customScroll.sp = 32;
            }
        },
        /* event binded functions : */
        // scroll on mouse down
        mousedown : function (o, s) {
            if (customScroll.sc == 0) {
                // new class name
                o.cont.sb.className = 'customScroll_sb customScroll_sb_down';
                customScroll.asd = o.cont;
                customScroll.sc = s;
                customScroll.sp = 400;
                customScroll.arrow_scroll();
            }
        },
        // on mouseMove binded event
        onmousemove : function(e) {
            if (! e) e = window.event;
            // get vertical mouse position
            customScroll.mouseY = e.screenY;
            if (customScroll.asd.sg) customScroll.asd.scrollTop = customScroll.asd.sZ + (customScroll.mouseY - customScroll.asd.yZ) / customScroll.asd.ratio;
        },
        // on mouseUp binded event
        onmouseup : function (e) {
            if (! e) e = window.event;
            var tg = (e.target) ? e.target : e.srcElement;
            if (customScroll.asd && document.releaseCapture) customScroll.asd.releaseCapture();
            // new class name
            if (customScroll.asd) customScroll.asd.sb.className = (tg.className.indexOf('scrollbar') > 0) ? 'customScroll_sb customScroll_sb_over' : 'customScroll_sb';
            document.onselectstart = '';
            customScroll.clear();
            customScroll.asd.sg = false;
        }
    }
    window.onload = function() {
        customScroll.scrollbarAll('.new-select__list'); // scrollbar initialization
        viewActionList();
        customScroll.refresh();
    }


    const select = document.querySelectorAll('.form__select');
    select.forEach((menu) => {
        
        const parent = menu.parentNode;
        let selectOption = menu.querySelectorAll('option');
        const selectOptionLength = selectOption.length;

        menu.style.display = 'none';
        let wrap = document.createElement('div');
        wrap.classList.add('form__select');
        wrap.appendChild(menu);
        let parentLabel = parent.innerText;
        parent.innerHTML = '';
        parent.innerText=parentLabel;
        parent.appendChild(wrap);

        /*--------------новое поле select--------------*/
        let new_menu;

       
        if (menu.querySelector('option').classList.contains('checkbox-option')) 
        {
             /*--------------меню из чекбоксов--------------*/
            new_menu = `<div class="new-select checkbox-select">${menu.getAttribute('placeholder')}</div>`;
        } else if (menu.querySelector('option').classList.contains('radio-option'))
        {
            /*----------------меню из радио------------------*/
            new_menu = `<div class="new-select radio-select">${menu.getAttribute('placeholder')}</div>`;
        } else {
            /*---------------обычное меню---------------*/
            new_menu = `<div class="new-select">${menu.getAttribute('placeholder')}</div>`;
        }
        wrap.insertAdjacentHTML("beforeend", new_menu);
        /*--------------новое поле select конец--------------*/


        


        /*-----------------новый список (создание и заполнение)--------------*/
        let new_menu_list
        if (menu.classList.contains('action-select')) {
            /*----------------список с возможностью пермещения и добавления строк-----------*/
            new_menu_list =`<div class="new-select__list action-list"></div>`;
        } else {
            /*----------------все остальные виды списков-------------------------*/
            new_menu_list = `<div class="new-select__list"></div>`;
        }
        wrap.insertAdjacentHTML("beforeend", new_menu_list);
        const selectList = wrap.querySelector('.new-select__list');

        /*------добавляем модификатор размера----------*/
        setSelectSize(menu, selectList);
        
        let option;
        let check;
        for (let i=0; i< selectOptionLength; i++) {
            check = '';
            if (menu.options[i].selected) {
                check="checked";
            }
            if (menu.options[i].classList.contains('radio-option')) {
                /*------------------добавляем радио в список----------------*/
                option = `<div class="new-select__item radio-item">
                    <label class="form__label form__label_width_radio radio_label">
                    <input type="radio" class="input__radio invisible-radio" name="${menu.getAttribute('name')}" value="${menu.options[i].getAttribute('value')}" ${check}>
                    <div class="visible-radio"></div>
                    <div class="radio_label_text">${menu.options[i].innerText}</div>
                </label></div>`;
            } else 
            if (menu.options[i].classList.contains('checkbox-option')){
                if (menu.options[i].classList.contains('move-option')) {
                    /*------------------чекбокс с меткой для перемещения-------------*/
                    option = `<div class="new-select__item checkbox-item item-move">
                        <label class="form__label form__label_width_checkbox checkbox_label">
                        <input type="checkbox" class="input__checkbox invisible-checkbox" name="${menu.getAttribute('name')}" value="${menu.options[i].getAttribute('value')}" ${check}>
                        <div class="visible-checkbox"></div>
                        <div class="checkbox_label_text">${menu.options[i].innerText}</div>
                    </label></div>`;
                } else {
                    /*--------------добавляем просто чекбокс в список-------------*/
                    option = `<div class="new-select__item checkbox-item">
                        <label class="form__label form__label_width_checkbox checkbox_label">
                        <input type="checkbox" class="input__checkbox invisible-checkbox" name="${menu.getAttribute('name')}" value="${menu.options[i].getAttribute('value')}" ${check}>
                        <div class="visible-checkbox"></div>
                        <div class="checkbox_label_text">${menu.options[i].innerText}</div>
                    </label></div>`;
                }
            } else {
                /*---------------------элемент обычного списка-------------*/
                option = `<div class="new-select__item"><span>${menu.options[i].innerText}</span></div>`;
            }
            selectList.insertAdjacentHTML("beforeend", option);
        }
        if (menu.classList.contains('action-select')) {
            /*----------------------элемент для добавления строк в "особый" список--------------------*/
            option = `<div class="new-select__item item-add"><input type="text" id="input-add" placeholder="Новый этап"></div>`;
            selectList.insertAdjacentHTML("beforeend", option);
        }
        /*-----------------новый список (создание и заполнение) конец--------------*/

        /*----------открываем/закрываем список, меняем текст в новом поле select, ставим метки selected в исходном списке--------------*/
        const selectHead = parent.querySelector('.new-select');
        let selectItem = selectList.querySelectorAll('.new-select__item');;
        
        selectHead.addEventListener('click', () => {
            if (!(selectHead.classList.contains('on'))) {
                selectHead.classList.add('on');
                viewMenu(selectList, selectHead);
                customScroll.refresh();
            } else {
                selectHead.classList.remove('on');
                viewMenu(selectList, selectHead);
            }
        });
        let addListItem = [];
        selectItem.forEach((listItem) => {
            if (listItem.classList.contains('item-add')) {
                addListItem.push(listItem);
            }
        })
        addListItem.forEach((addItem) => {
            addItem.addEventListener('keydown', (event) => {
                if (event.keyCode=="13") {
                    createNewItem(addItem, addItem.parentNode, menu);
                    selectItem = selectList.querySelectorAll('.new-select__item');
                    selectItem.forEach((listItem) => {   
                        listItem.addEventListener('mouseup', () => {
                            listsConnection(listItem, selectOption, selectHead);
                        })
                    })
                    selectOption = selectList.parentNode.parentNode.querySelectorAll('select option');
                    customScroll.refresh();
                }
            })
        })
       
        if (!(selectHead.classList.contains('on'))) {
            selectItem.forEach((listItem) => {   
                listItem.addEventListener('mouseup', () => {
                    listsConnection(listItem, selectOption, selectHead);
                })
            })
        }
        
    })   
    
    
}

function listsConnection(listItem, selectOption, selectHead) {
    /*-----------ищем соответсвие между созданным пунктом списка и исходником---------*/
    selectOption.forEach((elem) => {
        let text;
        if (listItem.classList.contains('radio-item')) {
            text = listItem.querySelector('.radio_label_text').innerText;
        } else if (listItem.classList.contains('checkbox-item')) {
            text = listItem.querySelector('.checkbox_label_text').innerText;
        } else {
            text = listItem.innerText;
        }
        /*-----------------СТАВЛЮ МЕТКУ SELECTED------------*/
        let sel;
        if (elem.innerText === text) {
            sel=false;
            if (elem.getAttribute('selected') == "true" || elem.getAttribute('selected')=='') {sel=true}
            if (listItem.classList.contains('checkbox-item') && sel) {
                elem.setAttribute('selected', false);
            } else {
                elem.setAttribute('selected',true);
            }
            if (listItem.querySelector('span')) {
                selectHead.innerText=text;
                selectHead.classList.remove('on');
                hide(listItem.parentNode.parentNode);
            }
        }   else if (!(listItem.classList.contains('checkbox-item')) && !(listItem.classList.contains('item-add'))) {
            elem.setAttribute('selected', false);
        }
    })
    /*----------открываем/закрываем список, меняем текст в новом поле select, ставим метки selected в исходном списке конец--------------*/
}
/*-----------вспомогательные функции--------------*/
function hide(el) {
    el.style.display='none';
}
function show(el) {
    el.style.display='block';
}
function viewMenu(menu, head) {
    if (head.classList.contains('on')) {
        show(menu.parentNode);
    } else {
        hide(menu.parentNode);
    }
}
function createNewItem(item, parent, menu) {
    
    let sourceOption;
    if (item.querySelector('input').value != '') {
        option = `<div class="new-select__item checkbox-item">
                            <label class="form__label form__label_width_checkbox checkbox_label">
                            <input type="checkbox" class="input__checkbox invisible-checkbox">
                            <div class="visible-checkbox"></div>
                            <div class="checkbox_label_text">${item.querySelector('input').value}</div>
                        </label></div>`;
        sourceOption = `<option class="form__option checkbox-option" value=${item.querySelector('input').value}>${item.querySelector('input').value}</option>`
        parent.insertAdjacentHTML('beforeend', option);
        menu.insertAdjacentHTML('beforeend', sourceOption);
        item.querySelector('input').value='';
    }
}
function moveItems() {
    document.querySelectorAll('.action-list').forEach((item) => {
        dragula([item], {
          moves: (el, source, handle, sibling) => el.classList.contains('item-move')
        });
    })
}
function setSelectSize(select, list) {
    switch (select.getAttribute('size')) {
        case "2": 
            list.classList.add('form__select_size_2');
            break;
        case "3": 
            list.classList.add('form__select_size_3');
            break;
        case "4": 
            list.classList.add('form__select_size_4');
            break;
        case "5": 
            list.classList.add('form__select_size_5');
            break;
        case "8": 
            list.classList.add('form__select_size_8');
            break;
    }
}
function viewActionList() {
    const actionList = document.querySelectorAll('.action-list');
    actionList.forEach((list) => {
        list.parentNode.parentNode.querySelector('.new-select').classList.add('on');
        list.parentNode.parentNode.querySelector('.new-select').style.display='none';
        list.parentNode.style.marginTop='10px';
        show(list.parentNode);
    })
    const radioHead = document.querySelectorAll('.new-select.radio-select');
    radioHead.forEach((head) => {
        head.classList.add('on');
        head.style.display='none';
        head.nextElementSibling.style.marginTop='10px';
        show(head.nextElementSibling);

    })
}

checkBtnAction();
phoneMask();
customSelect();
moveItems();