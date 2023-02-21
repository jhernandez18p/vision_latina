 function GetVersion(hostip) {
     $.ajax({
         type: "GET",
         url: "http://" + hostip + "/get_version",
         dataType: "xml",
         cache: false,
         success: function(data) {
             var version = $(data).find("version").text();
             version = parseFloat(version) +1;
            // version = toDecimal2(version);
             $("#version").append(version+"A");
         }
     });
 }

 function toDecimal2(x) {
     var f = parseFloat(x);
     if (isNaN(f)) {
         return false;
     }
     var f = Math.round(x * 100) / 100;
     var s = f.toString();
     var rs = s.indexOf('.');
     if (rs < 0) {
         rs = s.length;
         s += '.';
     }
     while (s.length <= rs + 2) {
         s += '0';
     }
     return s;
 }

 function checkDress(str) {
     str = decodeURIComponent(str);
     var result = true;
     if (str.indexOf("rtmp://") != -1) {
         result = false;
     } else if (str.indexOf("rtmps://") != -1) {
         result = false;
     } else {
         result = true;
     }
     return result;
 }

 function checkIp(str) {
     var ss = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
     return ss.test(str);
 }

 function getNowFormatDate() {
     var now = new Date();
     var currenseconds = Math.round(now.getTime() / 1000);
     return currenseconds;
 }

 function Getsystime() {
     var nowtime = getNowFormatDate();
     $.ajax({
         type: "GET",
         url: "http://" + hostip + "/set_time?sync_time=" + nowtime,
         dataType: "text",
         cache: false,
         success: function(data) {
             if (data == "succeed") {
				 alert(GetSettingResultText($("#LanSle").val(), 0));
			 }else {
				 alert(GetSettingResultText($("#LanSle").val(), -1));
			 }
         }
     });
 }
 function GetSettingResultText(language, result)
 {
	 //result 0表示success, result -1表示失败
	 if(language == "chinese") {
		 if(result == 0) {
			return '设置成功！';
		 }else {
			return '设置失败！';
		 }
	 }
	 else {
		if(result == 0) {
			return 'Set successfully!';
		}else {
			return 'Failed to set!';
		}
	 }
 }

 function changeLan(name) {
	if(name.indexOf(".") == -1 && name != "/") return;

	var Language = $("#LanSle").val();
	if(name == "/") {
		if(Language == 'English') name = "/index.html";
		else name = "/indexE.html";
	}
	var left = name.substr(0, name.indexOf("."));
	var right = name.substr(name.indexOf("."));	
	if (Language == 'English') {
		$.ajax({
			type: "GET",
			url: "http://" + hostip + "/set_sys?language=english",
			dataType: "text",
			cache: false
		});
		window.location.href = left + "E" + right;
	}
	else {
		left = left.substr(0, left.length - 1);
		$.ajax({
			type: "GET",
			url: "http://" + hostip + "/set_sys?language=chinese",
			dataType: "text",
			cache: false
		});
		window.location.href = left + right;
	}
}

function IsInteger(interger) {
	var IsInteger = true;
	if (parseInt(interger) == interger) {
		IsInteger = true;
	}
	else {
		IsInteger = false;
	}
	return IsInteger;
}

function GetName(num) {
	var Language = $("#LanSle").val();
	var result = "";
	if(Language == "Chinese") {
		if (num == 0) {
			result = "区域一";
		}
		else if (num == 1) {
			result = "区域二";
		}
		else if (num == 2) {
			result = "区域三";
		}
		else if (num == 3) {
			result = "区域四";
		}
	}
	else{
		if (num == 0) {
			result = "Zone 1";
		}
		else if (num == 1) {
			result = "Zone 2";
		}
		else if (num == 2) {
			result = "Zone 3";
		}
		else if (num == 3) {
			result = "Zone 4";
		}
	}
	return result;
}

function checkIp(str) {
	var ss = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	return ss.test(str);
}

function CheckMac(str) {
	var reg_name = /^[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}$/;
	return reg_name.test(str);
}

function checkNetmask(str) {
	var ss = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
	return ss.test(str);
}

function setssid(num) {
	var ssid = $("#ap" + num).val();
	$("#wifi_essid").attr("value", ssid);
}
function wifi_dhcpEnable(num) {
	var dhcp = $("#wifi_dhcp_enable" + num).val();
	if (dhcp == 0) {
		$("#wifi_ip").removeAttr("disabled");
		$("#wifi_netmask").removeAttr("disabled");
		$("#wifi_gateway").removeAttr("disabled");
	}
	else {
		$("#wifi_ip").attr("disabled", "disabled");
		$("#wifi_netmask").attr("disabled", "disabled");
		$("#wifi_gateway").attr("disabled", "disabled");
	}
}
function dhcpEnable() {
	var dhcp = $("#dhcp_enable").val();
	if (dhcp == 0) {
		$("#ip0Txt").removeAttr("disabled");
		$("#netmask0Txt").removeAttr("disabled");
		$("#gateway0Txt").removeAttr("disabled");
	}
	else {
		$("#ip0Txt").attr("disabled", "disabled");
		$("#netmask0Txt").attr("disabled", "disabled");
		$("#gateway0Txt").attr("disabled", "disabled");
	}
}

function timeStr2Int(timeStr) {
	var nums = timeStr.split(":");
	var hour = parseInt(nums[0]);
	var min = parseInt(nums[1]);
	return hour * 60 + min; //minutes
}
function timeInt2Str(timeInt) {
	var hour = parseInt(timeInt / 60);
	var min = parseInt(timeInt % 60);

	var str;
	if (hour < 10) str = "0" + hour;
	else str = hour.toString();

	if (min < 10) str += ":0" + min;
	else str += ":" + min;

	return str;
}

function OnSelectVideoAndAudioOnly(type) {
	var video_only = $("#only_video_enable").val();
	var audio_only = $("#only_audio_enable").val();
	if (type == 0 && video_only == 1) { //video
		$("#only_audio_enable").attr("value", 0);
	}
	else if (type == 1 && audio_only == 1) {
		$("#only_video_enable").attr("value", 0);
	}
}