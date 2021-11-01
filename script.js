let base;
const LINK_BASE = 'https://streamkit.discord.com/overlay/voice/%SERVER_ID%/%CHANNEL_ID%?icon=true&online=true&logo=white&text_color=%23ffffff&text_size=14&text_outline_color=%23000000&text_outline_size=0&text_shadow_color=%23000000&text_shadow_size=0&bg_color=%231e2124&bg_opacity=0.95&bg_shadow_color=%23000000&bg_shadow_size=0&invite_code=&limit_speaking=false&small_avatars=false&hide_names=false&fade_chat=0';

function load(){
    $.get("../assets/css.txt", function(data) {
        base = data;
    });
	
	const linkForm = document.getElementById('link');
	linkForm.addEventListener('submit', (event) => {
		event.preventDefault();
		
		const serverID = linkForm.elements['serverID'].value;
		const channelID = linkForm.elements['channelID'].value;
		
		const generated = generateLink(serverID, channelID);
		copy(generated);
	});
	
	const mainForm = document.getElementById('main');
	mainForm.addEventListener('submit', (event) => {
		event.preventDefault();
		
		const discordID = mainForm.elements['discordID'].value;
		const passiveURL = mainForm.elements['passiveURL'].value;
		const activeURL = mainForm.elements['activeURL'].value;
		const notSpeakingBrightness = mainForm.elements['notSpeakingBrightness'].value;
		const showName = mainForm.elements['showName'].checked;
		
		const generated = generateCss(discordID, passiveURL, activeURL, notSpeakingBrightness, showName);
		copy(generated);
	});
}



function generateLink(serverId, channelId){
	let result = LINK_BASE;
	result = result.replace(`%SERVER_ID%`, serverId);
	result = result.replace(`%CHANNEL_ID%`, channelId);
	
	return result;
}

function generateCss(userId, notSpeakingUrl, speakingUrl, notSpeakingBrightness, showName){
	let result = base;
	result = result.replace(`%USER_ID%`, userId);
	result = result.replace(`%NOT_SPEAKING_URL%`, notSpeakingUrl);
	result = result.replace(`%SPEAKING_URL%`, speakingUrl || notSpeakingUrl);
	result = result.replace(`%SHOW_NAME%`, showName ? 'block' : 'none');
	result = result.replace(`%NOT_SPEAKING_BRIGHTNESS%`, notSpeakingBrightness || '70');
	
	return result;
}



function setLinkText(link){
	const text = document.getElementById('generatedLink');
	text.innerHTML = link;
}

function setCssText(css){
	const text = document.getElementById('generatedCode');
	text.innerHTML = css;
}

function copy(text){
	window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}



load();