// 음성 인식을 위한 인터페이스 SpeechRecognition
interface SpeechRecognition extends EventTarget {
  new (): SpeechRecognition;
  grammars: SpeechGrammarList;
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  serviceURI: string;

  onaudiostart: (event: Event) => void;
  onsoundstart: (event: Event) => void;
  onspeechstart: (event: Event) => void;
  onspeechend: (event: Event) => void;
  onsoundend: (event: Event) => void;
  onaudioend: (event: Event) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onnomatch: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionError) => void;
  onstart: (event: Event) => void;
  onend: (event: Event) => void;

  start(): void;
  stop(): void;
  abort(): void;
}

// 이벤트 관련 타입 정의
interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
  readonly interpretation: any;
  readonly emma: Document;
}

// 추가: 전역 네임스페이스에 타입 선언
interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}
