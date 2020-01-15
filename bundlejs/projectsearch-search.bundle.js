"use strict";function ReBindingView(){Site.ReValidateForm(document.querySelectorAll("[data-form-submit-lead]")),LoadCleave(),LoadSwiperAgent(),AddEventDropdownList()}function AddEventDropdownList(){var e=document.querySelector("[name='LeadDataModel.RoomMin']"),t=document.querySelector("[name='LeadDataModel.RoomMax']");UpdateEventCuple(e,t);var a=document.querySelector("[name='LeadDataModel.RoadMin']"),n=document.querySelector("[name='LeadDataModel.RoadMax']");UpdateEventCuple(a,n);var i=document.querySelector("[name='LeadDataModel.SizeMin']"),o=document.querySelector("[name='LeadDataModel.SizeMax']");UpdateEventCuple(i,o);var r=document.querySelector("[name='LeadDataModel.PriceMin']"),d=document.querySelector("[name='LeadDataModel.PriceMax']");UpdateEventCuple(r,d)}function UpdateEventCuple(e,t){e&&t&&e.addEventListener("change",function(e){for(var a=+e.target.value,n=t.querySelectorAll("option"),i=0;i<n.length;i++)+n[i].value<a?n[i].setAttribute("disabled",""):n[i].removeAttribute("disabled");a>t.value&&(t.selectedIndex=0)})}function LoadSwiperAgent(){var e=document.querySelector("._p-SliderAgentContactForm .swiper-container");e&&(swiperAgent=new Swiper(e,{paginationType:"fraction",effect:"flip",initialSlide:+e.dataset.activeSlide,grabCursor:!0,loop:!0,navigation:{nextEl:".fa-angle-left",prevEl:".fa-angle-right"},pagination:{el:"._p-paging"}}),swiperAgent.on("slideChange",function(){var e=swiperAgent.slides[swiperAgent.activeIndex],t=document.querySelector("[name='LeadDataModel.ReceiAgentId']");t.value=e.dataset.agentId;var a=e.dataset.agentImage,n=document.querySelector("[data-agent-thank-image]");n&&n.setAttribute("src",a);var i=e.dataset.agentName,o=document.querySelector("[data-agent-thank-name]");o&&(o.innerText=i),UpdateBtn()}),UpdateBtn())}function UpdateBtn(){var e=swiperAgent.slides[swiperAgent.activeIndex],t=document.querySelector("._p-SliderAgentContactForm [data-btn]");+e.dataset.curentLead>+e.dataset.maxLead?t.setAttribute("disabled","disabled"):t.removeAttribute("disabled")}function LoadCleave(){for(var e=document.querySelectorAll("[name='LeadDataModel.PhoneNumber']"),t=0;t<e.length;t++){new Cleave(e[t],{numericOnly:!0,delimiters:[" ",".",".","."],prefix:"+84",blocks:[3,3,3,5]})}}function InitProjectTableRow(){var e=document.querySelectorAll("[data-target-model][data-user-id]");frmLoadContact=document.getElementById("formShowContactLazy"),txtUserId=frmLoadContact.querySelector("[name=UserId]"),projectId=frmLoadContact.querySelector("[name=ProjectId]"),btnSubmitModel=frmLoadContact.querySelector("[type=submit]");for(var t=0;t<e.length;t++){var a=e[t];a.addEventListener("click",function(e){txtUserId.value=e.target.dataset.userId,projectId.value=e.target.dataset.projectId,btnSubmitModel.click()})}}function InitControls(){markPlaceAddress=document.getElementById("markPlaceAddress"),frmAdvanceSearch=document.getElementById("frmAdvanceSearch"),rangePriceLabel=document.getElementById("rangePriceLabel"),rangeRoomLabel=document.getElementById("rangeRoomLabel"),rangeSizeLabel=document.getElementById("rangeSizeLabel"),userInput=document.getElementById("UserInput")}function BindingEvent(){markPlaceAddress.addEventListener("keypress",function(e){var t=e.keyCode?e.keyCode:e.which;13===t&&btnSearch.click()}),markPlaceAddress.addEventListener("keyup",function(e){userInput.value=e.target.value})}function InitComboboxSearchType(){var e=document.getElementById("SelectedPropertyGroupType");e.addEventListener("change",function(e){Site.RemoveClass("._p-check-property-type","show"),Site.AddClass("._p-check-property-type","hide");for(var t=e.target.value,a=document.querySelectorAll("._p-check-property-type"),n=0;n<a.length;n++){var i=a[n];if(i.dataset.value===t){Site.RemoveClassElement(i,"hide"),Site.AddClassElement(i,"show");var o=i.dataset.refix;frmAdvanceSearch.action=frmAdvanceSearch.dataset.actionTemplate.replace("REFIX",o).replace("{PAGE}",1)}}}),e.dispatchEvent(new Site.CreateEvent("change"))}function InnitElasticSearch(){var e=LocalStorageHelper.Get(LocalStogeEnum.SELECTED_LOCATION_STORAGE_NAME);fuzzyComplete=new BcFuzzySearch,fuzzyComplete.Init("#markPlaceAddress",null!=e?e.id:null,null!=e?e.address:"","address","id",LocalStogeEnum.ALL_PLACES,bindingDataCompleteCallBack,bindingDataFailedCallback,selectionCallback,"#frmAdvanceSearch #PlaceId",10,3),e&&(markPlaceAddress.value=e.address)}function bindingDataCompleteCallBack(e,t){}function bindingDataFailedCallback(e,t){Site.NotifyFormFailed("LỖI","Lấy dự liệu thất bại. Vui lòng làm mới lại trang. Hoặc thông báo cho chugn1 tôi biết quá webmaster@baocat.vn")}function selectionCallback(e,t,a){if(console.log(a),t){LocalStorageHelper.Save(LocalStogeEnum.SELECTED_LOCATION_STORAGE_NAME,{id:a,address:t.item.display});var n=SeoUrl.MapSearchUrl(frmAdvanceSearch.dataset.refix,t.item.display,a,1);frmAdvanceSearch.action=n}else frmSubmit.placeId.value=null}function InputSearchInputCallBack(e){}function InitSlider(){var e,t,a=document.getElementById("rangePrice");noUiSlider.create(a,{range:{min:[0],"5%":[2e8,1e8],"70%":[4e9,1e9],"80%":[1e10,2e9],"95%":[2e10,5e9],max:[25e9]},start:[0,25e9],step:1e8,connect:!0,pips:{mode:"count",values:9,density:2,stepped:!0,format:wNumb({decimals:0,edit:function(e){return e=+e,0===e?0:25e9===e?"...":e<1e9?e/1e6+" tr":e/1e9+" tỷ"}})}}),e=a.dataset.min||0,t=a.dataset.max||99999999999999,a.noUiSlider.set([e,t]),a.noUiSlider.on("update",function(e,t){var a,n;frmAdvanceSearch.RangePriceMin.value=null,frmAdvanceSearch.RangePriceMax.value=null,0===+e[0]?a="Dưới ":25e9===+e[0]?a="":+e[0]<1e9?(a=+e[0]/1e6+" triệu",frmAdvanceSearch.RangePriceMin.value=+e[0]):(a=+e[0]/1e9+" tỷ",frmAdvanceSearch.RangePriceMin.value=+e[0]),0===+e[1]?a="":25e9===+e[1]?0===+e[0]?(n="Tất cả",a=""):(n="",a="Trên "+a):+e[1]<1e9?(n=+e[1]/1e6+" triệu",frmAdvanceSearch.RangePriceMax.value=+e[1]):(n=+e[1]/1e9+" tỷ",frmAdvanceSearch.RangePriceMax.value=+e[1]),n===a&&(a=""),""!==a&&""!==n&&0!==+e[0]&&(a+=" - "),rangePriceLabel.innerText=a+n});var n=document.getElementById("rangeRoom");noUiSlider.create(n,{range:{min:[0],"95%":[10,1],max:[11]},start:[0,100],step:1,stepped:!0,connect:!0,pips:{mode:"count",values:12,density:1,stepped:!0,format:wNumb({decimals:0,edit:function(e){return e=+e,0===e?0:11===e?"...":e}})}}),e=n.dataset.min||0,t=n.dataset.max||99999999999999,n.noUiSlider.set([e,t]),n.noUiSlider.on("update",function(e,t){var a,n;frmAdvanceSearch.RangeRoomMin.value=null,frmAdvanceSearch.RangeRoomMax.value=null,0===+e[0]?a="Dưới ":11===+e[0]?a="":(a=+e[0],frmAdvanceSearch.RangeRoomMin.value=+e[0]),0===+e[1]?a="":11===+e[1]?0===+e[0]?(n="Tất cả",a=""):(n="",a="Trên "+a):(n=+e[1],frmAdvanceSearch.RangeRoomMax.value=+e[1]),n===a&&(a=""),""!==a&&""!==n&&0!==+e[0]&&(a+=" - "),rangeRoomLabel.innerText=a+n});var i=document.getElementById("rangeSize");noUiSlider.create(i,{range:{min:[0],"5%":[20,10],"30%":[100,10],"70%":[300,10],"95%":[1e3,10],max:[1010]},start:[0,1e4],step:10,density:1,connect:!0,pips:{mode:"values",values:[30,50,100,150,200,250,300,500,700,900,1010],format:wNumb({decimals:0,edit:function(e){return e=+e,0===e?0:1010===e?"...":e}})}}),e=i.dataset.min||0,t=i.dataset.max||99999999999999,i.noUiSlider.set([e,t]),i.noUiSlider.on("update",function(e,t){var a,n;frmAdvanceSearch.RangeSizeMin.value=null,frmAdvanceSearch.RangeSizeMax.value=null,0===+e[0]?a="Dưới ":1010===+e[0]?a="":(a=+e[0],frmAdvanceSearch.RangeSizeMin.value=Math.round(e[0])),0===+e[1]?a="":1010===+e[1]?0===+e[0]?(n="Tất cả",a=""):(n="",a="Trên "+a+" m<sup class='text-12'>2<sup/>"):(n=+e[1]+" m<sup class='text-12'>2<sup/>",frmAdvanceSearch.RangeSizeMax.value=Math.round(e[1])),n===a&&(a=""),""!==a&&""!==n&&0!==+e[0]&&(a+=" - "),rangeSizeLabel.innerHTML=a+n})}function RefreshListProSaved(e,t){Site.AddClassNameInTime("[data-btn-saved-property]","_blink",1e3);var a=Site.FindParent(e,"_property-item");if(null!=a){var n=new FormData;n.append("PropertyId",a.dataset.propId),console.log(a.dataset.propId);var i;t?(i="//"+document.location.host+"/PublicProperty/SaveProperty",AjaxRequest.SendFormData("POST",i,n,function(e,t){"undefined"!=typeof google&&google&&google.maps&&google.maps.event.trigger(GMap.InfoBoxMouseClick,"closeclick"),savedPropertiesNumber&&(savedPropertiesNumber.innerText=e)},null)):(i="//"+document.location.host+"/PublicProperty/RemoveSavedProperty",AjaxRequest.SendFormData("POST",i,n,function(e,t){"undefined"!=typeof google&&google&&google.maps&&google.maps.event.trigger(GMap.InfoBoxMouseClick,"closeclick"),savedPropertiesNumber&&(savedPropertiesNumber.innerText=e,ReloadSavedForm())},null))}}function ReloadSavedForm(){var e=document.getElementById("formLazyLoaduserHistory"),t=e.querySelector("#btnSubmitUserHistory");t.click()}function RefreshListProViewed(e,t){Site.AddClassNameInTime("[data-btn-viewed-property]","_blink",1e3);var a=Site.FindParent(e,"_property-item");if(null!=a){var n=new FormData;n.append("PropertyId",a.dataset.propId);var i="//"+document.location.host+(t?"/PublicProperty/SaveProperty":"/PublicProperty/RemoveSavedProperty");AjaxRequest.SendFormData("POST",i,n,function(e,t){"undefined"!=typeof google&&google&&google.maps&&google.maps.event.trigger(GMap.InfoBoxMouseClick,"closeclick"),savedPropertiesNumber&&(savedPropertiesNumber.innerText=e),UpdateListSaved()},null)}}function ReloadViewedForm(){var e=document.getElementById("formLazyLoaduserViewed"),t=e.querySelector("#btnSubmitUserViewed");t.click()}function PagingListSaved(){for(var e=document.querySelectorAll("._p-aside-container #pagination li button"),t=0;t<e.length;t++)e[t].addEventListener("click",function(e){formLazyLoaduserViewed.PageNumber.value=e.target.dataset.value;var t=formLazyLoaduserViewed.querySelector("[name='submitType']");t.click()})}function BindingLoadMore(){var e=document.getElementById("btnLoadMore");e.addEventListener("click",function(){disableLoading=!1,Site.RemoveParent("#btnLoadMore","_btnLoadMoreContainer"),LoadAjax(!0);var e=frmAdvanceSearch.dataset.refix;UpdateUrl(frmAdvanceSearch.dataset.actionTemplate.replace("REFIX",e).replace("{PAGE}",curentPage))})}function InitPaging(){ListPropertySortBy=document.getElementById("ListPropertySortBy"),chkRow1=document.getElementById("chkRow1"),frmAdvanceSearch=document.getElementById("frmAdvanceSearch"),btnSearch=document.getElementById("btnSearch"),chkGrid1=document.getElementById("chkGrid1"),formLazyLoaduserViewed=document.getElementById("formLazyLoaduserViewed"),leftSide=document.getElementById("leftSide"),boxFooter=document.querySelector(".box-footer"),listPropertyContainer=document.getElementById("listPropertyContainer"),rightSide=document.getElementById("rightSide"),pagination=document.getElementById("pagination");var e=document.querySelectorAll("#mainActicle #pagination a");maxPage=null!=pagination?+pagination.dataset.size:1;for(var t=0;t<e.length;t++)e[t].addEventListener("click",function(e){e.preventDefault(),frmAdvanceSearch.PageNumber.value=e.target.dataset.value,disableLoading=!1;var t=frmAdvanceSearch.dataset.refix,a=frmAdvanceSearch.dataset.actionTemplate.replace("REFIX",t).replace("{PAGE}",e.target.dataset.value);frmAdvanceSearch.action=a,btnSearch.click()});curentPage=1,Site.IsDesktopBackend()&&listPropertyContainer&&listPropertyContainer.clientHeight>rightSide.clientHeight&&(window.onscroll=function(){htmlEle.offsetHeight+scrollY===htmlEle.scrollHeight&&LoadAjax(!1),SectContactLocation()})}function SectContactLocation(){var e=document.documentElement.scrollTop||document.body.scrollTop;rightSideWidth=rightSide.clientWidth,rightSideHeight=rightSide.clientHeight,rightSide.style.width=rightSideWidth+"px",e<contactFomrmTop?rightSide.style.position="initial":boxFooter&&(e+rightSideHeight>boxFooter.offsetParent.offsetTop+boxFooter.offsetParent.clientHeight+200?(rightSide.style.top=boxFooter.offsetParent.offsetTop+boxFooter.offsetParent.clientHeight-1.5*rightSideHeight+200+"px",rightSide.style.position="absolute"):(rightSide.style.position="fixed",rightSide.style.top=0,rightSide.dataset.top=e))}function LoadAjax(){var e=document.querySelector(".box-footer #pagination .current a");if(null!=e&&!disableLoading&&+e.dataset.value<+maxPage){disableLoading=!0,Site.RemoveClassElement(facebookContainer,"hide");var t=document.querySelector(".box-footer #pagination .next"),a=new FormData(frmAdvanceSearch);a.append("PageNumber",t.dataset.value);var n="//"+document.location.host+"/PublicProperty/GetPropertySearchViewComponent?page="+t.dataset.value+"&mapSearchListType="+frmAdvanceSearch.MapSearchListType;AjaxRequest.SendFormData("POST",n,a,GetNextPropertiesComplete,GetListPropertyAjaxFailed),curentPage++}}function GetNextPropertiesComplete(e){SectContactLocation(),disableLoading=!1,Site.AddClassElement(facebookContainer,"hide");var t=document.querySelector("#listPropertyContainer #pagination");t.dataset.page=curentPage,Pagination.Run(),frmAdvanceSearch.PageNumber=curentPage;for(var a=Site.HtmlToElement(e),n=0;n<a.length;n++)facebookContainer.parentElement.insertBefore(a[n],facebookContainer);if(curentPage%5===0){var i=Site.HtmlToElement('<div class="row _btnLoadMoreContainer tablet-col-2 relative border-silver border-1 border-bottom padding-10 border-solid text-center"><button id="btnLoadMore" class="btn red round l">XEM THÊM</button></div>');facebookContainer.parentElement.insertBefore(i[0],facebookContainer),disableLoading=!0,BindingLoadMore()}UpdateUrl(frmAdvanceSearch.dataset.actionTemplate,curentPage),Site.MomentTime(),Site.bLazy.revalidate()}function GetListPropertyAjaxFailed(e){disableLoading=!1,Site.AddClassElement(facebookContainer,"hide")}function UpdateUrl(e,t){var a=document.title,n=a?a+" "+curentPage:" Page "+curentPage;document.title=n;var i=frmAdvanceSearch.dataset.refix,o=frmAdvanceSearch.dataset.actionTemplate.replace("REFIX",i).replace("{PAGE}",t);history.pushState(null,n,o,t)}!function(e){function t(e,t){for(var a=window,n=(e||"").split(".");a&&n.length;)a=a[n.shift()];return"function"==typeof a?a:(t.push(e),Function.constructor.apply(null,t))}function a(e){return"GET"===e||"POST"===e}function n(e,t){a(t)||e.setRequestHeader("X-HTTP-Method-Override",t)}function i(t,a,n){var i;a&&void 0!==a.isUpdateLayout&&!a.isUpdateLayout||n.indexOf("application/x-javascript")===-1&&(i=(t.getAttribute("data-ajax-mode")||"").toUpperCase(),e(t.getAttribute("data-ajax-update")).each(function(t,n){var o;switch(i){case"BEFORE":o=n.firstChild,e("<div />").html(a).contents().each(function(){n.insertBefore(this,o)});break;case"AFTER":e("<div />").html(a).contents().each(function(){n.appendChild(this)});break;case"REPLACE-WITH":e(n).replaceWith(a);break;default:e(n).html(a)}}))}function o(o,r){var d,c,l,s;d=o.getAttribute("data-ajax-confirm"),d&&!window.confirm(d)||(c=e(o.getAttribute("data-ajax-loading")),s=parseInt(o.getAttribute("data-ajax-loading-duration"),10)||0,e.extend(r,{type:o.getAttribute("data-ajax-method")||void 0,url:o.getAttribute("data-ajax-url")||void 0,cache:!!o.getAttribute("data-ajax-cache"),beforeSend:function(e){var a;return n(e,l),a=t(o.getAttribute("data-ajax-begin"),["xhr"]).apply(o,arguments),a!==!1&&c.show(s),a},complete:function(){c.hide(s),t(o.getAttribute("data-ajax-complete"),["xhr","status"]).apply(o,arguments),console.log("complete")},success:function(e,a,n){i(o,e,n.getResponseHeader("Content-Type")||"text/html"),t(o.getAttribute("data-ajax-success"),["data","status","xhr"]).apply(o,arguments),console.log("success")},error:function(){t(o.getAttribute("data-ajax-failure"),["xhr","status","error"]).apply(o,arguments),console.log("error")}}),r.data.push({name:"X-Requested-With",value:"XMLHttpRequest"}),l=r.type.toUpperCase(),a(l)||(r.type="POST",r.data.push({name:"X-HTTP-Method-Override",value:l})),e.ajax(r))}function r(t){var a=e(t).data(l);return!a||!a.validate||a.validate()}var d="unobtrusiveAjaxClick",c="unobtrusiveAjaxClickTarget",l="unobtrusiveValidation";e(document).on("click","a[data-ajax=true]",function(e){e.preventDefault(),o(this,{url:this.href,type:"GET",data:[]})}),e(document).on("click","form[data-ajax=true] input[type=image]",function(t){var a=t.target.name,n=e(t.target),i=e(n.parents("form")[0]),o=n.offset();i.data(d,[{name:a+".x",value:Math.round(t.pageX-o.left)},{name:a+".y",value:Math.round(t.pageY-o.top)}]),setTimeout(function(){i.removeData(d)},0)}),e(document).on("click","form[data-ajax=true] :submit",function(t){var a=t.currentTarget.name,n=e(t.target),i=e(n.parents("form")[0]);i.data(d,a?[{name:a,value:t.currentTarget.value}]:[]),i.data(c,n),setTimeout(function(){i.removeData(d),i.removeData(c)},0)}),e(document).on("submit","form[data-ajax=true]",function(t){var a=e(this).data(d)||[],n=e(this).data(c),i=n&&n.hasClass("cancel");t.preventDefault(),(i||r(this))&&o(this,{url:this.action,type:this.method||"GET",data:a.concat(e(this).serializeArray())})})}(jQuery);var Pagination={code:"",Extend:function(e){e=e||{},Pagination.size=e.size?parseInt(e.size):0,Pagination.page=e.page?parseInt(e.page):0,Pagination.step=e.step?parseInt(e.step):0,Pagination.tagName=e.tagName||"a",Pagination.attribute=e.attribute||"",Pagination.hrefToken=e.hrefToken||"",Pagination.showValue=!!e.showValue||!1,Pagination.submitFromAttributes=null!=e.form?'form="'+e.form+'" type=submit name="PageNumber"':"",Pagination.hover=e.hover||"",Pagination.itemClassName="",e.hover&&(Pagination.itemClassName+=" class='hover-tooltip' ")},Add:function(e,t){for(var a=e;a<t;a++){var n=Pagination.hrefToken?'href="'+Pagination.hrefToken.replace("{PAGE}",a)+'"':"",i=Pagination.showValue?'value="'+a+'"':"",o=Pagination.hover?"<span class='tooltip top'>"+Pagination.hover.replace("{PAGE}",a)+"</span>":"";Pagination.code+="<li"+Pagination.itemClassName+"><"+Pagination.tagName+" "+Pagination.submitFromAttributes+" "+n+" "+i+" "+Pagination.attribute+"data-value="+a+" >"+a+"</"+Pagination.tagName+">"+o+"</li>"}},Last:function(){var e=Pagination.hrefToken?'href="'+Pagination.hrefToken.replace("{PAGE}",Pagination.size>1?Pagination.size:1)+'"':"",t=Pagination.showValue?'value="'+(Pagination.size>1?Pagination.size:1)+'"':"",a=Pagination.hover?"<span class='tooltip top'>"+Pagination.hover.replace("{PAGE}",Pagination.size>1?Pagination.size:1)+"</span>":"";Pagination.code+="<i>...</i><li data-last "+Pagination.itemClassName+" ><"+Pagination.tagName+" "+Pagination.submitFromAttributes+" "+e+" "+t+" "+Pagination.attribute+"data-value="+Pagination.size+">"+Pagination.size+"</"+Pagination.tagName+">"+a+"</li>"},First:function(){var e=Pagination.hrefToken?'href="'+Pagination.hrefToken.replace("{PAGE}",1)+'"':"",t=Pagination.showValue?'value="1"':"",a=Pagination.hover?"<span class='tooltip top'>"+Pagination.hover.replace("{PAGE}",1)+"</span>":"";Pagination.code+="<li data-first "+Pagination.itemClassName+"><"+Pagination.tagName+" "+Pagination.submitFromAttributes+" "+e+" "+t+" "+Pagination.attribute+" data-value=1>1</"+Pagination.tagName+">"+a+"</li><i>...</i>"},Click:function(){Pagination.page=+this.innerHTML,Pagination.Start()},Prev:function(){Pagination.page--,Pagination.page<1&&(Pagination.page=1),Pagination.Start()},Next:function(){Pagination.page++,Pagination.page>Pagination.size&&(Pagination.page=Pagination.size),Pagination.Start()},Bind:function(){for(var e=Pagination.e.getElementsByTagName(Pagination.tagName),t=0;t<e.length;t++)+e[t].innerHTML===Pagination.page&&(e[t].parentElement.className="current"),Pagination.submitFromAttributes||e[t].addEventListener("click",Pagination.Click,!1)},Finish:function(){Pagination.e.innerHTML=Pagination.code,Pagination.code="",Pagination.Bind()},Start:function(){Pagination.size<2*Pagination.step+6?Pagination.Add(1,Pagination.size+1):Pagination.page<2*Pagination.step+1?(Pagination.Add(1,2*Pagination.step+4),Pagination.Last()):Pagination.page>Pagination.size-2*Pagination.step?(Pagination.First(),Pagination.Add(Pagination.size-2*Pagination.step-2,Pagination.size+1)):(Pagination.First(),Pagination.Add(Pagination.page-Pagination.step,Pagination.page+Pagination.step+1),Pagination.Last()),Pagination.Finish()},Buttons:function(e){var t=e.getElementsByTagName(Pagination.tagName);t[0].addEventListener("click",Pagination.Prev,!1),t[1].addEventListener("click",Pagination.Next,!1)},Create:function(e){var t=Pagination.hrefToken?'href="'+Pagination.hrefToken.replace("{PAGE}",Pagination.page>1?Pagination.page-1:1)+'"':"",a=Pagination.hrefToken?'href="'+Pagination.hrefToken.replace("{PAGE}",Pagination.size>Pagination.page?Pagination.page+1:Pagination.size)+'"':"",n=Pagination.showValue?'value="'+(Pagination.page>1?Pagination.page-1:1)+'"':"",i=Pagination.showValue?'value="'+(Pagination.page>1?Pagination.page-1:1)+'"':"",o=["<li"+Pagination.itemClassName+"><"+Pagination.tagName+' class="pre" '+Pagination.submitFromAttributes+" "+n+" "+Pagination.attribute+" "+t+" data-value="+(Pagination.page>1?Pagination.page:1)+" >&#9668;</"+Pagination.tagName+"></li>","<span></span>","<li"+Pagination.itemClassName+"><"+Pagination.tagName+' class="next" '+Pagination.submitFromAttributes+" "+i+" "+Pagination.attribute+" "+a+" data-value="+(Pagination.size>Pagination.page?Pagination.page+1:Pagination.size)+" >&#9658;</"+Pagination.tagName+"></li>"];e.innerHTML=o.join(""),Pagination.e=e.getElementsByTagName("span")[0],Pagination.Buttons(e)},Init:function(e,t){Pagination.Extend(t),Pagination.Create(e),Pagination.Start()},Run:function(){for(var e=document.getElementsByClassName("_p-gination"),t=0;t<e.length;t++){var a=e[t];Pagination.Init(a,a.dataset)}}};document.addEventListener("DOMContentLoaded",Pagination.Run(),!1);var swiperAgent=null;document.addEventListener("DOMContentLoaded",function(){}),document.addEventListener("DOMContentLoaded",function(){Site.MomentTime()});var frmLoadContact,txtUserId,btnSubmitModel,projectId;document.addEventListener("DOMContentLoaded",function(){InitProjectTableRow()});var markPlaceAddress,frmAdvanceSearch,rangePriceLabel,rangeRoomLabel,rangeSizeLabel,userInput,fuzzyComplete;document.addEventListener("DOMContentLoaded",function(){InitControls(),InitSlider(),InitComboboxSearchType(),InnitElasticSearch(),BindingEvent()});var showSavedProperty=document.querySelector("[data-target-model='#savedModel']"),showViewedProperty=document.querySelector("[data-target-model='#viewedModel']"),savedPropertiesNumber=document.getElementById("savedPropertiesNumber"),viewedPropertiesNumber=document.getElementById("viewedPropertiesNumber");document.addEventListener("DOMContentLoaded",function(){showSavedProperty.addEventListener("click",ReloadSavedForm),showViewedProperty.addEventListener("click",ReloadViewedForm)});var facebookContainer=null,disableLoading=!1,curentPage=0,maxPage=0,contactFomrmTop=427,leftSideTop=60,rightSideWidth,rightSideHeight,leftSideWidth,leftSideHeight,ListPropertySortBy,chkRow1,frmAdvanceSearch,btnSearch,chkGrid1,formLazyLoaduserViewed,rightSide,leftSide,boxFooter,listPropertyContainer,pagination,htmlEle=document.documentElement;document.addEventListener("DOMContentLoaded",function(){facebookContainer=document.querySelector("._p-facebook-loading"),InitPaging(),Site.BindingSelectAutoSubmit(),ListPropertySortBy&&ListPropertySortBy.addEventListener("change",function(e){disableLoading=!1,frmAdvanceSearch.action=frmAdvanceSearch.dataset.actionTemplate.replace("{PAGE}",1),e.preventDefault(),btnSearch.click()}),chkRow1&&(chkRow1.addEventListener("change",function(e){e.target.checked&&LocalStorageHelper.UserStoge.UpdateListViewStyle(e.target.value)}),chkRow1.hasAttribute("checked")&&(chkRow1.checked=!0)),chkGrid1&&(chkGrid1.addEventListener("change",function(e){e.target.checked&&LocalStorageHelper.UserStoge.UpdateListViewStyle(e.target.value)}),chkGrid1.hasAttribute("checked")&&(chkGrid1.checked=!0))});