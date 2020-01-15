"use strict";function FileUpload(){this.InputElement=null,this.PreviewBoxElement=null,this.CurentImageBox=null,this.Form=null,this.MaxFile=null,this.StoredFiles=[],this.CurentFiles=[],this.Extend=function(e,t,a,n,i,o,r){var l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:null,s=arguments.length>8&&void 0!==arguments[8]&&arguments[8],d=arguments.length>9&&void 0!==arguments[9]?arguments[9]:"";this.InputElement=a,this.PreviewBoxElement=i,this.CurentImageBox=n,this.Form=o,this.UniqueControlName=d,this.MaxFile=r||2,this.InputChangeCallBack=l,this.InputElement.addEventListener("change",this.InputChange),this.InputElement.fileUpload=this,this.FileReader=new FileReader,this.IsCreateInputName=s,this.HostCdn=e||"",this.CurentFiles=t||[],this.Process()},this.Process=function(){if(this.CurentImageBox){var e=this;this.CurentFiles.forEach(function(t){var a=document.createElement("div");a.className="col-3 gutter-10 _p-item";var n=document.createElement("figure");n.className="_max-height-200 relative hover-children-show";var i=document.createElement("button");i.className="absolute hide tablet-show -border width-100 height-100 _fill-silver-opacity text-strong",i.innerText="CLICK ĐỂ XÓA",i.type="button",i.dataset.file=t,i.addEventListener("click",function(t){e.RemoveCurentFile(t,e.InputElement)});var o=t.substring(t.lastIndexOf("/")+1),r="<img class='width-100' src='"+e.HostCdn+t+"' alt='"+o+"' data-file='"+o+"' /><figcaption class='padding-5 text-center _text-ellipsis'>"+o+"</figcaption>";if(e.IsCreateInputName){var l="<input type='text' class='_hidden' name='CurentFilePaths"+e.UniqueControlName+"[]' value="+t+"></input>";r+=l}n.innerHTML=r,n.insertBefore(i,n.childNodes[0]),a.appendChild(n),e.CurentImageBox.appendChild(a)})}},this.InputChange=function(e){var t=e.target.fileUpload,a=e.target.files,n=Array.prototype.slice.call(a);t.PreviewBoxElement.innerHTML="",t.StoredFiles=[],n.forEach(function(e){if(e.type.match("image.*")&&(t.StoredFiles.push(e),t.PreviewBoxElement===t.CurentImageBox&&(t.CurentFiles=[],t.CurentImageBox.innerHTML=""),t.StoredFiles.length+t.CurentFiles.length<=t.MaxFile)){var a=new FileReader;a.onload=function(a){var n=document.createElement("div");n.className="col-3 gutter-10 _p-item";var i=document.createElement("figure");i.className="_max-height-200 relative hover-children-show";var o=document.createElement("button");o.className="absolute hide -border width-100 height-100 _fill-silver-opacity text-strong",o.type="button",o.innerText="CLICK ĐỂ XÓA",o.dataset.file=e.name,o.addEventListener("click",function(e){t.RemoveFile(e,t.InputElement)});var r="<img class='width-100' src='"+a.target.result+"' alt='"+e.name+"' data-file='"+e.name+"' /><figcaption class='padding-5 text-center _text-ellipsis'>("+e.size%1e3+" kb) "+e.name+"</figcaption>";if(t.IsCreateInputName){var l="<input type='text' class='_hidden' name='NewFiles"+t.UniqueControlName+"[]' value="+e.name+"></input>";r+=l}i.innerHTML=r,i.insertBefore(o,i.childNodes[0]),n.appendChild(i),t.PreviewBoxElement.appendChild(n)},a.readAsDataURL(e)}}),t.InputChangeCallBack&&t.InputChangeCallBack(t.StoredFiles)},this.RemoveCurentFile=function(e){for(var t=e.target.dataset.file,a=0;a<this.CurentFiles.length;a++)if(this.CurentFiles[a]===t){this.CurentFiles.splice(a,1);break}var n=Site.FindParent(e.target,"_p-item");n.remove()},this.RemoveFile=function(e,t){for(var a=e.target.dataset.file,n=0;n<this.StoredFiles.length;n++)if(this.StoredFiles[n].name===a){this.StoredFiles.splice(n,1);break}var i=Site.FindParent(e.target,"_p-item");i.remove(),Site.ClearInputFile(t)},this.Init=function(e,t,a,n,i,o,r,l,s,d){var u=document.querySelector(a),c=document.querySelector(i),m=document.querySelector(n),p=document.querySelector(o);null!=u&&null!=c||console.warn(a+" or "+c+": NULL"),this.Extend(e,t,u,m,c,p,r,l,s,d)}}function DinamicField(){this.ItemOrigin=null,this.ItemContentReplace=null,this.ItemClassReplace=null,this.InputText=null,this.ButtonAddNewItem=null,this.CloneItem=null,this.Extend=function(e){this.ItemOrigin=e.querySelector("[data-item]:last-child"),this.ItemContentReplace=e.dataset.replaceContent,this.ItemClassReplace=e.dataset.replaceClass,this.ButtonAddNewItem=this.ItemOrigin.querySelector("[data-button-add]"),this.InputText=this.ItemOrigin.querySelector("[data-input-text]"),this.IncludeRequiredInput=!!this.InputText,this.ChildsItems=e.querySelectorAll("[data-button-remove]"),this.Process()},this.Process=function(){for(var e=this,t=0;t<this.ChildsItems.length;t++)this.ChildsItems[t].addEventListener("click",function(e){var t=Site.FindParentByAttribute(e.target,"data-item");t&&t.remove()});this.CloneItem=this.ItemOrigin.cloneNode(!0),this.CloneItem.querySelector("[data-button-add]").innerHTML=this.ItemContentReplace,this.CloneItem.querySelector("[data-button-add]").classList.contains(this.ItemClassReplace)&&this.CloneItem.querySelector("[data-button-add]").classList.remove(this.ItemClassReplace),this.IncludeRequiredInput&&(this.InputText.removeAttribute("required"),this.InputText.removeAttribute("name")),this.ButtonAddNewItem.addEventListener("click",function(t){if(e.InputText&&!e.InputText.value)return void Site.Notify("Thông báo","Bạn chưa nhập dự liệu",!0,"error");var a=e.ItemOrigin.parentNode,n=e.CloneItem.cloneNode(!0);e.IncludeRequiredInput&&(n.querySelector("[data-input-text]").value=e.InputText.value),n.querySelector("[data-button-add]").setAttribute("data-button-remove",""),n.querySelector("[data-button-add]").removeAttribute("data-button-add"),n.querySelector("[data-button-remove]").addEventListener("click",function(e){if(!e.target.value){var t=Site.FindParentByAttribute(e.target,"data-item");t&&t.remove()}}),e.IncludeRequiredInput&&n.querySelector("[data-input-text]").addEventListener("change",function(e){if(!e.target.value){var t=Site.FindParentByAttribute(e.target,"data-item");t&&t.remove()}}),a.insertBefore(n,e.ItemOrigin),e.IncludeRequiredInput&&(e.InputText.value=""),Site.ReValidateElement(n)})},this.Init=function(e){this.Extend(e)}}function initCreateProject(){}function initPartialSessionAbout(e){var t=imageUpload.dataset.curentPathFiles,a=new FileUpload;a.Init(null,t.indexOf("|")>0?t.split("|"):""!==t?[t]:null,"[data-type='About'] #BackdroundImageFile","#sessionAboutImageReviews","#sessionAboutImageReviews",null,1,inputFileCallBack,!0),bindingEventSessionEvent(),e&&streetAddress.dispatchEvent(new Site.CreateEvent("keyup"))}function initSessionAbout(){imageUpload=document.querySelector("#BackdroundImageFile"),streetAddress=document.getElementById("StreetAddress"),selectPlaceId=document.getElementById("SelectedPlaceId"),btnGetMyLocation=document.getElementById("btnGetMyLocation"),autoCompleteAddress=document.getElementById("MapAddress"),displayAddressLat=document.getElementById("DisplayAddressLat"),displayAddressLng=document.getElementById("DisplayAddressLng")}function bindingEventSessionEvent(){streetAddress.addEventListener("keyup",function(e){updateAddress()},500),selectPlaceId.addEventListener("change",function(e){updateAddress()}),autoCompleteAddress.addEventListener("keypress",function(e){var t=e.charCode||e.keyCode||0;13===t&&e.preventDefault()}),btnGetMyLocation.addEventListener("click",function(e){Site.GetGeoLocation(function(e){var t=new google.maps.LatLng(e.coords.latitude,e.coords.longitude);GAddressMap.Map.setCenter(t)},function(){Site.NotifyFormFailed("THÔNG BÁO",'<p>Cho phép chúng tôi xác định vị trí của bạn.</p><img style="width: 100%;" src="/images/shared/enable-geo-location/'+Site.GetBrowserName()+'.png">')})})}function updateAddress(){autoCompleteAddress.value=[allTitleCase(streetAddress.value),selectPlaceId.options[selectPlaceId.selectedIndex].text].JoinNotNull(", "),GAddressMap.FirePlaceChange(autoCompleteAddress.value)}function inputFileCallBack(e){}function LoadMap(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(document.querySelector("#MapAddress")){initSessionAbout();var t=new Object;t.mapElementSelector="#map",t.autocompleteElementSelector="#MapAddress",t.mapChangeCallBack=MapChangeEndCallback,t.deaultLatLng=new google.maps.LatLng(NumberHelper.ToDouble(displayAddressLat.value),NumberHelper.ToDouble(displayAddressLng.value)),t.scrollwheel=!0,t.defaultZoom=17,t.minZoom=12,GAddressMap.Init(t),GAddressMap.LoadMap(),initPartialSessionAbout(e)}}function MapChangeEndCallback(e,t,a){a?(displayAddressLat.value=NumberHelper.ToFrDouble(e.lat()),displayAddressLng.value=NumberHelper.ToFrDouble(e.lng())):(displayAddressLat.value=0,displayAddressLng.value=0)}function initPartialSessionSummary(){initSessionSummary(),bindingEventSessionSummary()}function initSessionSummary(){dateStart=document.querySelector("#DateStart"),dateEnd=document.getElementById("DateEnd"),imgLogo=document.getElementById("InvestorLogoFile"),projectLogo=document.getElementById("ProjectFile"),imgBackground=document.querySelector("[data-type='Summary'] #BackdroundImageSummaryFile")}function bindingEventSessionSummary(){var e=(new Cleave(dateStart,{date:!0,datePattern:["m","Y"]}),new Cleave(dateEnd,{date:!0,datePattern:["m","Y"]}),projectLogo.dataset.curentPathFiles),t=new FileUpload;t.Init(null,e.indexOf("|")>0?e.split("|"):""!==e?[e]:null,"[data-type='Summary'] #ProjectFile","#projectLogoReview","#projectLogoReview",null,1,null,!0,"ProjectLogo");var a=imgLogo.dataset.curentPathFiles,n=new FileUpload;n.Init(null,a.indexOf("|")>0?a.split("|"):""!==a?[a]:null,"[data-type='Summary'] #InvestorLogoFile","#investorLogoReview","#investorLogoReview",null,1,null,!0,"Logo");var i=imgBackground.dataset.curentPathFiles,o=new FileUpload;o.Init(null,i.indexOf("|")>0?i.split("|"):""!==i?[i]:null,"[data-type='Summary'] #BackdroundImageSummaryFile","[data-type='Summary'] #backdroundImageSummaryFileReview","[data-type='Summary'] #backdroundImageSummaryFileReview",null,1,null,!0,"Background")}function inputFileCallBack(e){}function initPartialSessionLocation(){initSessionLocation(),bindingEventSessionLocation()}function initSessionLocation(){imgBackgroundlocation=document.querySelector("[data-type='Location'] #BackdroundImageLocationFile"),rootLocationContainer=document.querySelector("[data-dynamic-list]"),dinamicField=new DinamicField,dinamicField.Init(rootLocationContainer)}function bindingEventSessionLocation(){var e=imgBackgroundlocation.dataset.curentPathFiles,t=new FileUpload;t.Init(null,e.indexOf("|")>0?e.split("|"):""!==e?[e]:null,"[data-type='Location'] #BackdroundImageLocationFile","[data-type='Location'] #backdroundImageLocationFileReview","[data-type='Location'] #backdroundImageLocationFileReview",null,1,null,!0,"BakgroundLocation")}function inputFileCallBack(e){}function initPartialProjectPlanSummary(){initSessionMasterPlan(),bindingEventSessionMasterPlan(),bindingDragDropMasterPlan()}function initSessionMasterPlan(){btnSessionMasterPlaUpdate=document.getElementById("uploadImagesSessionMasterPlan"),containerPartial=document.querySelector("[data-masterplan-container]"),ulContainer=document.getElementById("listImages"),formUploadImagesSessionMasterPlan=document.getElementById("formUploadImagesSessionMasterPlan")}function bindingEventSessionMasterPlan(){btnSessionMasterPlaUpdate&&btnSessionMasterPlaUpdate.addEventListener("change",function(e){var t=e.target.files;if(t.length){Site.ShowWindowLoadding();var a=new FormData(e.target.form),n=e.target.form.action;AjaxRequest.SendFormData("POST",n,a,loadPartialSuccessMasterPlan,loadPartialFailedMasterPlan)}})}function loadPartialSuccessMasterPlan(e){Site.HideWindowLoadding();var t=containerPartial.parentElement;containerPartial.remove(),t.appendChild(Site.HtmlToElement(e)[0]),initPartialProjectPlanSummary()}function loadPartialFailedMasterPlan(e){Site.HideWindowLoadding(),Site.NotifyFormFailed("LỖI","Thao tác thất bại. Vui lòng thử lại")}function bindingDragDropMasterPlan(){sortable=Sortable.create(ulContainer,{animation:150,handle:"._z-li-handle",ghostClass:"_z-ghost-class",chosenClass:"_z-chosen",onEnd:function(e){reloadOrderMasterPlan()}})}function reloadOrderMasterPlan(){for(var e=document.querySelectorAll("#listImages li"),t=0;t<e.length;t++){var a=e[t].querySelector("[id$='__Title']"),n=e[t].querySelector("[id$='__Description']"),i=e[t].querySelector("[id$='__OriginImage']");a.name="ProjectComplexImageModels["+t+"].Title",n.name="ProjectComplexImageModels["+t+"].Description",i.name="ProjectComplexImageModels["+t+"].OriginImage"}}function initSessionUtilities(){btnSessionUtilitiesUpdate=document.getElementById("uploadImagesSessionUtilities"),listImagesBox=document.getElementById("listImagesBox"),btnRemoveImageUtilites=document.querySelectorAll("[name=btnRemoveImageUtilites]"),dataUtilitiesContainer=document.querySelector("[data-utilities-container]"),bindingEventSessionUtilities(),bindingDragDrop()}function bindingEventSessionUtilities(){btnSessionUtilitiesUpdate&&btnSessionUtilitiesUpdate.addEventListener("change",function(e){Site.ShowWindowLoadding();var t=e.target.files;if(t.length){var a=new FormData(e.target.form),n=e.target.form.action;AjaxRequest.SendFormData("POST",n,a,loadPartialSuccessUtilities,loadPartialFailedUtilities)}});for(var e=0;e<btnRemoveImageUtilites.length;e++)btnRemoveImageUtilites[e].addEventListener("click",function(e){var t=Site.FindParentByAttribute(e.target,"data-item");Site.RemoveParentByElement(e.target,"_imgItem"),0===t.querySelectorAll("._imgItem").length&&t.parentNode.removeChild(t),RefreshArrayIndex()})}function RefreshArrayIndex(){for(var e=listImagesBox.querySelectorAll("li"),t=0;t<e.length;t++){var a=e[t].querySelectorAll("[data-image]"),n=e[t].querySelector("[data-title]");n.name="ProjectComplexRoomImagesModels["+t+"].Title";for(var i=0;i<a.length;i++)a[i].name="ProjectComplexRoomImagesModels["+t+"].ListCurentWildcardImages["+i+"]"}}function loadPartialSuccessUtilities(e){Site.HideWindowLoadding();var t=dataUtilitiesContainer.parentElement;dataUtilitiesContainer.remove(),t.appendChild(Site.HtmlToElement(e,!0)[0]),console.log(e),initSessionUtilities()}function loadPartialFailedUtilities(e){Site.HideWindowLoadding(),Site.NotifyFormFailed("LỖI","Thao tác thất bại. Vui lòng thử lại")}function bindingDragDrop(){listImagesBox&&(sortBoxUtilities=Sortable.create(listImagesBox,{animation:150,handle:"._z-li-handle",ghostClass:"_z-ghost-class",chosenClass:"_z-chosen",onEnd:function(e){RefreshArrayIndex()}}))}function initSessionSupport(){imgBackgroundSupport=document.querySelector("[data-type='Support'] #BackdroundImageSupportFile"),bindingEventSessionSupport()}function bindingEventSessionSupport(){var e=imgBackgroundSupport.dataset.curentPathFiles,t=new FileUpload;t.Init(null,e.indexOf("|")>0?e.split("|"):""!==e?[e]:null,"[data-type='Support'] #BackdroundImageSupportFile","[data-type='Support'] #backdroundImageSupportFileReview","[data-type='Support'] #backdroundImageSupportFileReview",null,1,null,!0,"BakgroundSupport")}function inputFileCallBack(e){}!function(e){function t(e,t){for(var a=window,n=(e||"").split(".");a&&n.length;)a=a[n.shift()];return"function"==typeof a?a:(t.push(e),Function.constructor.apply(null,t))}function a(e){return"GET"===e||"POST"===e}function n(e,t){a(t)||e.setRequestHeader("X-HTTP-Method-Override",t)}function i(t,a,n){var i;a&&void 0!==a.isUpdateLayout&&!a.isUpdateLayout||n.indexOf("application/x-javascript")===-1&&(i=(t.getAttribute("data-ajax-mode")||"").toUpperCase(),e(t.getAttribute("data-ajax-update")).each(function(t,n){var o;switch(i){case"BEFORE":o=n.firstChild,e("<div />").html(a).contents().each(function(){n.insertBefore(this,o)});break;case"AFTER":e("<div />").html(a).contents().each(function(){n.appendChild(this)});break;case"REPLACE-WITH":e(n).replaceWith(a);break;default:e(n).html(a)}}))}function o(o,r){var l,s,d,u;l=o.getAttribute("data-ajax-confirm"),l&&!window.confirm(l)||(s=e(o.getAttribute("data-ajax-loading")),u=parseInt(o.getAttribute("data-ajax-loading-duration"),10)||0,e.extend(r,{type:o.getAttribute("data-ajax-method")||void 0,url:o.getAttribute("data-ajax-url")||void 0,cache:!!o.getAttribute("data-ajax-cache"),beforeSend:function(e){var a;return n(e,d),a=t(o.getAttribute("data-ajax-begin"),["xhr"]).apply(o,arguments),a!==!1&&s.show(u),a},complete:function(){s.hide(u),t(o.getAttribute("data-ajax-complete"),["xhr","status"]).apply(o,arguments),console.log("complete")},success:function(e,a,n){i(o,e,n.getResponseHeader("Content-Type")||"text/html"),t(o.getAttribute("data-ajax-success"),["data","status","xhr"]).apply(o,arguments),console.log("success")},error:function(){t(o.getAttribute("data-ajax-failure"),["xhr","status","error"]).apply(o,arguments),console.log("error")}}),r.data.push({name:"X-Requested-With",value:"XMLHttpRequest"}),d=r.type.toUpperCase(),a(d)||(r.type="POST",r.data.push({name:"X-HTTP-Method-Override",value:d})),e.ajax(r))}function r(t){var a=e(t).data(d);return!a||!a.validate||a.validate()}var l="unobtrusiveAjaxClick",s="unobtrusiveAjaxClickTarget",d="unobtrusiveValidation";e(document).on("click","a[data-ajax=true]",function(e){e.preventDefault(),o(this,{url:this.href,type:"GET",data:[]})}),e(document).on("click","form[data-ajax=true] input[type=image]",function(t){var a=t.target.name,n=e(t.target),i=e(n.parents("form")[0]),o=n.offset();i.data(l,[{name:a+".x",value:Math.round(t.pageX-o.left)},{name:a+".y",value:Math.round(t.pageY-o.top)}]),setTimeout(function(){i.removeData(l)},0)}),e(document).on("click","form[data-ajax=true] :submit",function(t){var a=t.currentTarget.name,n=e(t.target),i=e(n.parents("form")[0]);i.data(l,a?[{name:a,value:t.currentTarget.value}]:[]),i.data(s,n),setTimeout(function(){i.removeData(l),i.removeData(s)},0)}),e(document).on("submit","form[data-ajax=true]",function(t){var a=e(this).data(l)||[],n=e(this).data(s),i=n&&n.hasClass("cancel");t.preventDefault(),(i||r(this))&&o(this,{url:this.action,type:this.method||"GET",data:a.concat(e(this).serializeArray())})})}(jQuery);var GAddressMap={Map:null,IsLoaded:!1,deaultLatLng:null,scrollwheel:!0,minZoom:12,mapChangeCallBack:null,autocompleteElement:null,defaultAddress:"",_Extend:function(e){GAddressMap.deaultLatLng=e.deaultLatLng,GAddressMap.defaultZoom=e.defaultZoom,GAddressMap.scrollwheel=e.scrollwheel,GAddressMap.minZoom=e.minZoom,GAddressMap.mapChangeCallBack=e.mapChangeCallBack,GAddressMap.IsLoaded=!1,GAddressMap.autocompleteElement=document.querySelector(e.autocompleteElementSelector),GAddressMap.defaultAddress=e.defaultAddress||"",GAddressMap.geocoder=new google.maps.Geocoder;var t=document.querySelector(e.mapElementSelector),a=e.deaultLatLng||new google.maps.LatLng(10.823099,106.629664);GAddressMap.defaultAddress&&GAddressMap.geocoder.geocode({address:GAddressMap.defaultAddress},function(e,t){"OK"===t&&e[0]&&(a=e[0].geometry.location,GAddressMap.deaultLatLng||GAddressMap.Map.setCenter(a))}),GAddressMap.Map=new google.maps.Map(t,{center:a,zoom:GAddressMap.defaultZoom,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!0,zoomControl:!0,panControl:!1,scaleControl:!1,streetViewControl:!1,scrollwheel:!1,minZoom:GAddressMap.minZoom,styles:[{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]}]}),GAddressMap.searchBox=new google.maps.places.SearchBox(GAddressMap.autocompleteElement),GAddressMap.searchBox.addListener("places_changed",function(){console.log("Place Change");var e=GAddressMap.searchBox.getPlaces();if(console.log(e),e&&0!==e.length){var t=e[0];if(!t.geometry)return void console.log("Returned place contains no geometry");GAddressMap.Map.setCenter(t.geometry.location),GAddressMap.Map.setZoom(GAddressMap.defaultZoom)}})},FirePlaceChange:function(e){GAddressMap.geocoder.geocode({address:e},function(e,t){t===google.maps.GeocoderStatus.OK&&e[0]&&GAddressMap.Map.setCenter(e[0].geometry.location)})},LoadMap:function(){GAddressMap.IsLoaded=!0,GAddressMap.Map.addListener("idle",function(){console.log("idle"),GAddressMap.searchBox.setBounds(GAddressMap.Map.getBounds()),GAddressMap.geocoder.geocode({location:GAddressMap.Map.getCenter()},function(e,t){"OK"===t&&e[0]&&(GAddressMap.mapChangeCallBack(GAddressMap.Map.getCenter(),e[0].formatted_address,e),GAddressMap.autocompleteElement.value=e[0].formatted_address)})})},Init:function(e){GAddressMap._Extend(e)}};document.addEventListener("DOMContentLoaded",function(){initCreateProject(),Site.RemoveDefaultNumberInputField(),Site.BindingSelectAutoSubmit()});var imageUpload,streetAddress,selectPlaceId,btnGetMyLocation,autoCompleteAddress,displayAddressLat,displayAddressLng,dateStart,dateEnd,imgLogo,projectLogo,imgBackground,imgBackgroundlocation,rootLocationContainer,dinamicField,btnSessionMasterPlaUpdate,containerPartial,sortable,ulContainer,formUploadImagesSessionMasterPlan,btnSessionUtilitiesUpdate,listImagesBox,sortBoxUtilities,btnRemoveImageUtilites,dataUtilitiesContainer,imgBackgroundSupport;