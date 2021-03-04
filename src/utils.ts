export function randomiser(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

export function wordify(word: string): string {
	return word.charAt(0)
		+ word
			.slice(1)
			.toLowerCase()
			.replaceAll("_", " ")
		+ "s"
}

export function getKoreanVoice() {
	const koreanLocale = "ko-KR";
	if (window.speechSynthesis) {
		return window.speechSynthesis.getVoices().find(voice => {
			return voice.lang === koreanLocale;
		}) || null;
	} else {
		return null;
	}
}

export function isSpeechSynthesisAvailable() {
	return window.speechSynthesis && getKoreanVoice();
}

export function speak(text: string) {
	const utter = new SpeechSynthesisUtterance(text);
	utter.voice = getKoreanVoice();
	utter.pitch = 0.75;
	return speechSynthesis.speak(utter);
}
