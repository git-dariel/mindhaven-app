import { EventEmitter } from "events";
import { Audio, AVPlaybackStatus } from "expo-av";

// Speech envelope characteristics
// Speech typically follows: attack (quick rise) -> sustain -> decay -> release pattern
const SPEECH_ENVELOPE = {
  attackTime: 50, // ms - quick onset of syllables
  sustainTime: 100, // ms - vowel sound duration
  decayTime: 80, // ms - transition to next syllable
  releaseTime: 120, // ms - end of sound
  pauseTime: 200, // ms - typical pause between words
};

class AudioProcessor extends EventEmitter {
  private sound: Audio.Sound | null = null;
  private recording: Audio.Recording | null = null;
  private isProcessing: boolean = false;
  private readonly sampleInterval: number = 30; // ms - more frequent sampling for smoother animation
  private readonly noiseThreshold: number = -35; // dB
  private sampleAudioPath = require("../assets/audio/speech.mp3");

  // Keep track of speech pattern simulation
  private speechPhase: "attack" | "sustain" | "decay" | "release" | "pause" = "pause";
  private phaseStartTime: number = 0;
  private lastPosition: number = 0;
  private syllableBoundaries: number[] = [];
  private wordBoundaries: number[] = [];

  constructor() {
    super();
    this.setupAudioMode();
    this.generateSpeechPattern();
  }

  private async setupAudioMode() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
    } catch (error) {
      console.error("Error setting audio mode:", error);
    }
  }

  // Generate realistic speech pattern boundaries for sample audio
  private generateSpeechPattern() {
    // This simulates typical word and syllable timings in speech
    // For a real implementation, this would come from actual audio analysis

    // Generate syllable boundaries (typically every 150-300ms in speech)
    let position = 0;
    while (position < 30000) {
      // 30 seconds of audio
      // Varying syllable lengths
      const syllableLength = Math.random() * 150 + 150;
      position += syllableLength;
      this.syllableBoundaries.push(position);

      // Add word boundaries (every 2-5 syllables)
      if (Math.random() < 0.3) {
        // Add a word pause
        position += Math.random() * 200 + 100;
        this.wordBoundaries.push(position);
      }
    }
  }

  private async requestPermissions(): Promise<boolean> {
    try {
      const permission = await Audio.requestPermissionsAsync();
      return permission.granted;
    } catch (error) {
      console.error("Error requesting permissions:", error);
      return false;
    }
  }

  private generateAmplitudesFromStatus(status: AVPlaybackStatus): number[] {
    if (!status.isLoaded || status.positionMillis === undefined) return [0, 0, 0, 0, 0, 0];

    const position = status.positionMillis;

    // Detect if we jumped in the audio (seeking)
    if (Math.abs(position - this.lastPosition) > this.sampleInterval * 2) {
      this.updateSpeechPhase(position);
    }

    this.lastPosition = position;

    // Check if we need to update the speech phase
    const timeInPhase = position - this.phaseStartTime;
    const phaseDuration = this.getPhaseDuration();

    if (timeInPhase >= phaseDuration) {
      this.updateSpeechPhase(position);
    }

    // Generate amplitudes based on the current speech phase
    return this.generateAmplitudesForPhase(timeInPhase / phaseDuration);
  }

  private getPhaseDuration(): number {
    switch (this.speechPhase) {
      case "attack":
        return SPEECH_ENVELOPE.attackTime;
      case "sustain":
        return SPEECH_ENVELOPE.sustainTime;
      case "decay":
        return SPEECH_ENVELOPE.decayTime;
      case "release":
        return SPEECH_ENVELOPE.releaseTime;
      case "pause":
        return SPEECH_ENVELOPE.pauseTime;
    }
  }

  private updateSpeechPhase(position: number) {
    // Determine if we're at a word boundary, syllable boundary, or mid-syllable
    const isAtWordBoundary = this.wordBoundaries.some(
      (pos) => Math.abs(position - pos) < this.sampleInterval * 2
    );
    const isAtSyllableBoundary = this.syllableBoundaries.some(
      (pos) => Math.abs(position - pos) < this.sampleInterval * 2
    );

    // Typical speech pattern cycles: attack -> sustain -> decay -> release (or pause)
    switch (this.speechPhase) {
      case "attack":
        this.speechPhase = "sustain";
        break;
      case "sustain":
        this.speechPhase = "decay";
        break;
      case "decay":
        this.speechPhase = isAtWordBoundary ? "pause" : "release";
        break;
      case "release":
        this.speechPhase = isAtSyllableBoundary ? "attack" : "pause";
        break;
      case "pause":
        // From pause, go to attack if we're speaking a new syllable
        this.speechPhase = Math.random() < 0.8 ? "attack" : "pause";
        break;
    }

    this.phaseStartTime = position;
  }

  private generateAmplitudesForPhase(progress: number): number[] {
    // Generate different amplitude patterns based on speech phase
    switch (this.speechPhase) {
      case "attack":
        // Quick rise in all frequencies, especially mids
        return [
          this.smoothStep(0, 0.8, progress), // Bass
          this.smoothStep(0, 0.9, progress), // LowMid
          this.smoothStep(0, 1.0, progress), // Mid (strongest)
          this.smoothStep(0, 0.85, progress), // HighMid
          this.smoothStep(0, 0.7, progress) * 0.7, // High
          this.smoothStep(0, 0.5, progress) * 0.5, // VeryHigh
        ];

      case "sustain":
        // Stable amplitude with slight variations for naturalness
        const baseAmplitude = 0.9;
        const variation = Math.sin(progress * Math.PI * 2) * 0.1;
        return [
          baseAmplitude * 0.8 + variation * 0.3, // Bass
          baseAmplitude * 0.9 + variation * 0.2, // LowMid
          baseAmplitude + variation * 0.1, // Mid (strongest)
          baseAmplitude * 0.85 + variation * 0.15, // HighMid
          baseAmplitude * 0.6 + variation * 0.2, // High
          baseAmplitude * 0.4 + variation * 0.1, // VeryHigh
        ];

      case "decay":
        // Gradual decline but not fully silent
        return [
          this.smoothStep(0.8, 0.4, progress), // Bass
          this.smoothStep(0.9, 0.3, progress), // LowMid
          this.smoothStep(1.0, 0.2, progress), // Mid
          this.smoothStep(0.85, 0.2, progress), // HighMid
          this.smoothStep(0.7, 0.1, progress) * 0.5, // High
          this.smoothStep(0.5, 0.05, progress) * 0.3, // VeryHigh
        ];

      case "release":
        // Smooth fade out to silence
        return [
          this.smoothStep(0.4, 0, progress), // Bass
          this.smoothStep(0.3, 0, progress), // LowMid
          this.smoothStep(0.2, 0, progress), // Mid
          this.smoothStep(0.2, 0, progress), // HighMid
          this.smoothStep(0.1, 0, progress) * 0.3, // High
          this.smoothStep(0.05, 0, progress) * 0.2, // VeryHigh
        ];

      case "pause":
        // Very low or silent, with some breath/ambient noise
        return [
          Math.random() * 0.05, // Bass
          Math.random() * 0.07, // LowMid
          Math.random() * 0.06, // Mid
          Math.random() * 0.08, // HighMid
          Math.random() * 0.1, // High (breath sounds)
          Math.random() * 0.09, // VeryHigh (breath sounds)
        ];
    }
  }

  // Smooth step function for natural transitions
  private smoothStep(min: number, max: number, progress: number): number {
    // Clamp progress between 0 and 1
    progress = Math.max(0, Math.min(1, progress));
    // Smooth curve using cubic function
    progress = progress * progress * (3 - 2 * progress);
    // Scale between min and max
    return min + progress * (max - min);
  }

  async startRecording() {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        throw new Error("Recording permission not granted");
      }

      // Create new recording instance
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        async (status) => {
          if (status.isRecording) {
            try {
              const recordingStatus = await recording.getStatusAsync();
              // Use durationMillis as a proxy for voice activity
              // When there's voice, durationMillis will be increasing
              const isActive = recordingStatus.durationMillis > 0;
              if (isActive) {
                // Simulate voice levels based on duration
                const level = Math.min(Math.random() * 0.7 + 0.3, 1);
                this.emit("amplitudes", [level, level, level, level, level, level]);
              } else {
                // No voice detected
                this.emit("amplitudes", [0, 0, 0, 0, 0, 0]);
              }
            } catch (e) {
              this.emit("amplitudes", [0, 0, 0, 0, 0, 0]);
            }
          }
        },
        this.sampleInterval
      );

      this.recording = recording;
      this.isProcessing = true;
    } catch (error) {
      console.error("Failed to start recording", error);
      throw error;
    }
  }

  async stopRecording(): Promise<string> {
    if (!this.recording) return "";

    try {
      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      this.recording = null;
      this.isProcessing = false;
      return uri || "";
    } catch (error) {
      console.error("Failed to stop recording", error);
      throw error;
    }
  }

  async loadAndProcessAudio(uri: string): Promise<Audio.Sound> {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { progressUpdateIntervalMillis: this.sampleInterval },
        this.onPlaybackStatusUpdate
      );

      this.sound = sound;
      return sound;
    } catch (error) {
      console.error("Error loading audio:", error);
      throw error;
    }
  }

  private onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    if (status.isPlaying) {
      // Generate amplitudes based on the audio playback position
      const amplitudes = this.generateAmplitudesFromStatus(status);
      this.emit("amplitudes", amplitudes);
    }

    if (status.didJustFinish) {
      this.emit("finished");
      this.isProcessing = false;
    }
  };

  async startProcessing() {
    try {
      // Reset speech phase tracking
      this.speechPhase = "pause";
      this.phaseStartTime = 0;
      this.lastPosition = 0;

      // Instead of recording, we now play the sample audio
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        this.sampleAudioPath,
        { progressUpdateIntervalMillis: this.sampleInterval },
        this.onPlaybackStatusUpdate
      );

      this.sound = sound;
      this.isProcessing = true;
      await sound.playAsync();
    } catch (error) {
      console.error("Error starting sample audio playback:", error);
      throw error;
    }
  }

  async stopProcessing() {
    this.isProcessing = false;
    if (this.recording) {
      await this.stopRecording();
    }
    if (this.sound) {
      await this.sound.stopAsync();
    }
  }

  async cleanup() {
    this.isProcessing = false;
    if (this.recording) {
      await this.recording.stopAndUnloadAsync();
      this.recording = null;
    }
    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound = null;
    }
    this.removeAllListeners();
  }
}

export const audioProcessor = new AudioProcessor();
