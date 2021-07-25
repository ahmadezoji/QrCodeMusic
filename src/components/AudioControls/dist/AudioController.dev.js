"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNativeSound = _interopRequireDefault(require("react-native-sound"));

var _reactNativeAudioStreamer = _interopRequireDefault(require("react-native-audio-streamer"));

var _reactNative = require("react-native");

var _reactNativeMusicControl = _interopRequireDefault(require("react-native-music-control"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AudioController =
/*#__PURE__*/
function () {
  //Inicializa atributos
  function AudioController() {
    _classCallCheck(this, AudioController);

    this.paused = true;
    this.playlist = [];
    /**
     * Propriedades do áudio
     * (*) Requerido
     * key*, title*, url*, author, thumbnail, path, currentTime, duration
     */

    this.currentAudio = {};
    this.type = 'streaming'; //Instância do Sound ou do RNAudioStreamer

    this.player = null; //Indice do áudio atual

    this.currentIndex = 0; //Callbacks

    this.currentAudioListener = function () {
      return null;
    };

    this.currentTimeListener = function () {
      return null;
    };

    this.onChangeStatus = function () {
      return null;
    };

    this.onChangeCurrentTime = function () {
      return null;
    }; //Status do áudio


    this.status = {
      PLAYING: 'PLAYING',
      LOADING: 'LOADING',
      LOADED: 'LOADED',
      PAUSED: 'PAUSED',
      STOPPED: 'STOPPED',
      SEEKING: 'SEEKING',
      ERROR: 'ERROR'
    };
  }
  /**
   * Carrega a playlist, track inicial, e seta callback
   * para mudança de estado do áudio e tempo atual do áudio
   *
   * @param {*Array} playlist
   * @param {*Int} track
   * @param {*Function} onChangeStatus
   * @param {*Function} onChangeCurrentTime
   */


  _createClass(AudioController, [{
    key: "init",
    value: function init(playlist) {
      var _this = this;

      var track = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var onChangeStatus = arguments.length > 2 ? arguments[2] : undefined;
      var onChangeCurrentTime = arguments.length > 3 ? arguments[3] : undefined;
      this.playlist = playlist; //Seta áudio atual como a track que o usuário passou

      this.currentAudio = playlist[track];
      this.currentIndex = track; //Seta listeners de mudança de estado e mudança de tempo atual do som

      this.onChangeStatus = onChangeStatus;
      this.onChangeCurrentTime = onChangeCurrentTime;
      this.onChangeStatus(this.status.LOADING); //Carrega o primeiro áudio

      this.load(this.currentAudio, function (isLoaded) {
        return isLoaded ? _this.onChangeStatus(_this.status.LOADED) : _this.onChangeStatus(_this.status.ERROR);
      }); //Adiciona listener para monitorar o estado do player de áudio streaming

      this.subscription = _reactNative.DeviceEventEmitter.addListener('RNAudioStreamerStatusChanged', this.onStatusChanged.bind(this));
    }
  }, {
    key: "onStatusChanged",
    value: function onStatusChanged(status) {
      var _this2 = this;

      if (status === 'PAUSED' || status === 'PLAYING') {
        //Atualiza a duração do áudio streaming após mudança de estado
        this.getDuration(function (seconds) {
          _this2.currentAudio.duration = seconds;
        });
        this.onChangeStatus(this.status.LOADED);
      }
    }
    /**
     * Carrega áudio e executa uma callback dizendo se foi carregado ou não
     *
     * @param {*Object} audio
     * @param {*Function} isLoaded
     */

  }, {
    key: "load",
    value: function load(audio, isLoaded) {
      var _this3 = this;

      this.musicControlReset(); // this.currentAudio = audio;
      // console.log(this.currentAudio.url);
      //Verificar se o arquivo de áudio já foi baixado para definir player

      if (this.currentAudio.url !== null) {
        //Áudio offline, this.player será instância do Sound
        this.type = 'offline';

        _reactNativeSound["default"].setCategory('Playback');

        this.player = new _reactNativeSound["default"](this.currentAudio.url, _reactNativeSound["default"].MAIN_BUNDLE, function (error) {
          if (error) return; //Executa callback se existir

          if (isLoaded) isLoaded(function () {
            return _this3.player.isLoaded();
          }); //Atualiza a duração do áudio

          _this3.getDuration(function (seconds) {
            _this3.currentAudio.duration = seconds;
          });
        });
        console.log(this.player);
      } else {
        // console.log('offline');
        //Áudio online, this.player será instância do RNAudioStreamer
        this.type = 'streaming';
        this.player = _reactNativeAudioStreamer["default"];
        this.player.setUrl(this.currentAudio.url); //Executa callback se existir

        if (isLoaded) isLoaded(true);
      } //Starta controle de áudio


      this.startMusicControl();
    } //------------ Funções básicas do player ------------//

  }, {
    key: "playerIsNull",
    value: function playerIsNull() {
      if (this.player == null) {
        this.onChangeStatus(this.status.ERROR);
        return true;
      }

      return false;
    }
  }, {
    key: "play",
    value: function play() {
      if (this.playerIsNull()) return; //Da play no áudio streaming ou local

      if (this.type === 'streaming') {
        this.player.play();
      } else {
        this.player.play(this.onAudioFinish.bind(this));
      } //Starta função que executa callback de tempo atual do som


      this.onAudioProgressTime(); //Configura Player e Music Control para iniciar de onde o usuário parou

      if (typeof this.currentAudio.currentTime !== 'undefined' && this.currentAudio.currentTime >= 0) {
        this.seek(this.currentAudio.currentTime);
      }

      this.paused = false;
      this.onChangeStatus(this.status.PLAYING);
      this.musicControlPlay();
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.playerIsNull()) return;
      this.player.pause(); //Salva o tempo atual do áudio

      this.currentAudio.currentTime = parseInt(this.currentAudio.currentTime, 10); //Para o listener de current time

      this.clearCurrentTimeListener();
      this.paused = true;
      this.onChangeStatus(this.status.PAUSED);
      this.musicControlPause();
    }
  }, {
    key: "seek",
    value: function seek(seconds) {
      if (this.playerIsNull()) return; //Se deu seek para final do áudio, para ele e coloca current time 0

      if (parseInt(seconds, 10) >= parseInt(this.currentAudio.duration, 10)) {
        this.clearCurrentTimeListener();
        this.player.pause();
        this.paused = true;
        this.musicControlPause();
        this.currentAudio.currentTime = 0;
        this.onChangeStatus(this.status.STOPPED);
        return;
      } //Aqui deve ser implementada uma chamada para a função seek, independente da biblioteca


      if (this.type === 'streaming') {
        this.player.seekToTime(seconds);
      } else {
        this.player.setCurrentTime(seconds);
      }

      var newCurrentTime = seconds >= 0 ? seconds : 0;
      this.onChangeCurrentTime(newCurrentTime); //Atualiza tempo atual

      this.currentAudio.currentTime = newCurrentTime;
      this.currentAudioListener(seconds);
      this.musicControlSeek(seconds);
      this.musicControlRefresh();
    }
  }, {
    key: "seekToForward",
    value: function seekToForward(seconds) {
      if (this.playerIsNull()) return; //Verifica se ao da forward chegou no final do áudio

      if (this.currentAudio.currentTime + seconds >= parseInt(this.currentAudio.duration, 10)) return;
      this.seek(this.currentAudio.currentTime + seconds);
    }
  }, {
    key: "skip",
    value: function skip(seconds) {
      var _this4 = this;

      if (this.playerIsNull()) return; //Aqui deve ser implementada uma chamada para a função skip, independente da biblioteca

      this.getDuration(function (duration) {
        _this4.getCurrentTime(function (currentTime) {
          var time = currentTime + seconds;
          if (time < 0) time = 0;else if (time > duration) time = duration;

          _this4.seek(time); //seconds

        });
      });
    }
  }, {
    key: "hasTrack",
    value: function hasTrack(index) {
      return this.playlist[index] !== undefined;
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      return this.playlist[this.currentIndex + 1] !== undefined;
    }
  }, {
    key: "hasPrevious",
    value: function hasPrevious() {
      return this.playlist[this.currentIndex - 1] !== undefined;
    }
  }, {
    key: "playNext",
    value: function playNext() {
      this.playAnotherTrack(this.currentIndex + 1);
    }
  }, {
    key: "playPrevious",
    value: function playPrevious() {
      this.playAnotherTrack(this.currentIndex - 1);
    }
  }, {
    key: "playAnotherTrack",
    value: function playAnotherTrack(index) {
      var _this5 = this;

      if (!this.hasTrack(index)) {
        return; // O próximo indice deve ser um indice válido na playlist
        //throw 'Playlist must contain index of next audio'
      }

      this.currentIndex = index;
      this.pause();
      this.selectedAudio = this.playlist[this.currentIndex];
      this.load(this.selectedAudio, function (isLoaded) {
        _this5.play();

        if (isLoaded) {
          if (_this5.type !== 'streaming') _this5.onChangeStatus(_this5.status.LOADED);
        } else return null;
      });
    } //------------ Callbacks ------------//
    //Inicializa o current time listener

  }, {
    key: "onAudioProgressTime",
    value: function onAudioProgressTime() {
      var _this6 = this;

      //Atualizando currentTime na audioProps
      this.currentTimeListener = setInterval(function () {
        _this6.getCurrentTime(function (seconds) {
          if (_this6.currentAudio.duration > 0 && seconds > _this6.currentAudio.duration) {
            _this6.player.pause();

            _this6.onChangeStatus(_this6.status.STOPPED);

            _this6.currentAudio.currentTime = 0;

            _this6.clearCurrentTimeListener();
          } else {
            _this6.currentAudio.currentTime = seconds;

            _this6.onChangeCurrentTime(seconds);
          }
        });
      }, 1000);
    } //Starta listener do current time

  }, {
    key: "startCurrentTimeListener",
    value: function startCurrentTimeListener() {
      this.onAudioProgressTime();
    } //Para listener do current time

  }, {
    key: "clearCurrentTimeListener",
    value: function clearCurrentTimeListener() {
      clearInterval(this.currentTimeListener);
    } //Retorna tempo atual do áudio

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime(callback) {
      if (this.playerIsNull()) return;

      if (this.type === 'streaming') {
        this.player.currentTime(function (err, seconds) {
          if (!err) callback(seconds);
        });
      } else {
        this.player.getCurrentTime(callback);
      }
    }
  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(seconds) {
      var secondsRound = parseInt(seconds, 10);
      if (this.type === 'streaming') this.player.seekToTime(secondsRound);else this.player.setCurrentTime(secondsRound);
      this.pause();
      this.play();
    }
  }, {
    key: "getDuration",
    value: function getDuration(callback) {
      if (this.playerIsNull()) return;

      if (this.type === 'streaming') {
        this.player.duration(function (err, seconds) {
          if (!err && seconds > 0) callback(seconds);else callback(-1);
        });
      } else if (this.player.getDuration() > 0) {
        callback(this.player.getDuration());
      }
    }
  }, {
    key: "onAudioFinish",
    value: function onAudioFinish() {
      this.musicControlReset();
      clearInterval(this.currentTimeListener);
    } //------------Alterar Estados do Music Control------------//

  }, {
    key: "musicControlsEnableControls",
    value: function musicControlsEnableControls() {
      _reactNativeMusicControl["default"].enableControl('skipBackward', true, {
        interval: 30
      });

      _reactNativeMusicControl["default"].enableControl('skipForward', true, {
        interval: 30
      });

      _reactNativeMusicControl["default"].enableControl('play', true);

      _reactNativeMusicControl["default"].enableControl('pause', true);
    }
  }, {
    key: "startMusicControl",
    value: function startMusicControl() {
      this.initializeMusicControlEvents();

      _reactNativeMusicControl["default"].setNowPlaying({
        title: this.currentAudio.title,
        //OK
        artwork: this.currentAudio.thumbnailUri ? this.currentAudio.thumbnailUri : this.currentAudio.thumbnailLocal,
        //OK
        artist: this.currentAudio.author,
        //OK
        album: this.currentAudio.author ? this.currentAudio.author : ''
      });

      this.musicControlsEnableControls();
    }
  }, {
    key: "musicControlPause",
    value: function musicControlPause() {
      this.getCurrentTime(function (elapsedTime) {
        _reactNativeMusicControl["default"].updatePlayback({
          state: _reactNativeMusicControl["default"].STATE_PAUSED,
          elapsedTime: elapsedTime
        });
      });
    }
  }, {
    key: "musicControlPlay",
    value: function musicControlPlay() {
      this.getCurrentTime(function (elapsedTime) {
        _reactNativeMusicControl["default"].updatePlayback({
          state: _reactNativeMusicControl["default"].STATE_PLAYING,
          elapsedTime: elapsedTime
        });
      });
    }
  }, {
    key: "musicControlRefresh",
    value: function musicControlRefresh() {
      var _this7 = this;

      this.getDuration(function (duration) {
        _this7.getCurrentTime(function (elaspsedTime) {
          _reactNativeMusicControl["default"].updatePlayback({
            elaspsedTime: elaspsedTime,
            duration: duration
          });
        });
      });
    }
  }, {
    key: "musicControlSeek",
    value: function musicControlSeek(elaspsedTime) {
      this.getDuration(function (duration) {
        _reactNativeMusicControl["default"].updatePlayback({
          elaspsedTime: elaspsedTime,
          duration: duration
        });
      });
    }
  }, {
    key: "musicControlReset",
    value: function musicControlReset() {
      _reactNativeMusicControl["default"].resetNowPlaying();
    }
  }, {
    key: "initializeMusicControlEvents",
    value: function initializeMusicControlEvents() {
      var _this8 = this;

      _reactNativeMusicControl["default"].on('pause', function () {
        _this8.pause();

        _this8.musicControlPause();
      });

      _reactNativeMusicControl["default"].on('play', function () {
        _this8.play();

        _this8.musicControlPlay();
      });

      _reactNativeMusicControl["default"].on('skipForward', function () {
        _this8.skip(30);
      }); // iOS only


      _reactNativeMusicControl["default"].on('skipBackward', function () {
        _this8.skip(-30);
      }); // iOS only

    }
  }]);

  return AudioController;
}();

var _default = new AudioController();

exports["default"] = _default;