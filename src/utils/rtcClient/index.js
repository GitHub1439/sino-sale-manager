/* eslint-disable no-constant-condition */
import TRTC from 'trtc-js-sdk'
// import basicOptions from './config'
class RtcClient {
    constructor(options) {
        Object.assign(options)
        this.sdkAppId_ = options.sdkAppId
        this.userId_ = options.userId
        this.userSig_ = options.userSig
        this.roomId_ = options.roomId
        this.clientDomId = options.clientDomId
        this.streamDomId = options.streamDomId

        this.isJoined_ = false
        this.isPublished_ = false
        this.isAudioMuted = false
        this.isVideoMuted = false
        this.localStream_ = null
        this.remoteStreams_ = []
        this.members_ = new Map()

        // create a client for RtcClient
        this.client_ = TRTC.createClient({
            mode: 'rtc',
            sdkAppId: this.sdkAppId_,
            userId: this.userId_,
            userSig: this.userSig_
        })
        this.handleEvents()
    }

    async join() {
        if (this.isJoined_) {
            console.warn('duplicate RtcClient.join() observed')
            return
        }
        try {
            // join the room
            console.log('join')
            await this.client_.join({
                roomId: this.roomId_
            })
            console.log('join room success')
            this.isJoined_ = true

            if (false) {
                this.localStream_ = TRTC.createStream({
                    audio: true,
                    video: true,
                    userId: this.userId_,
                    cameraId: getCameraId(),
                    microphoneId: getMicrophoneId(),
                    mirror: true
                })
            } else {
                this.localStream_ = TRTC.createStream({
                    audio: true,
                    video: true,
                    userId: this.userId_,
                    mirror: true
                })
            }
            try {
                await this.localStream_.initialize()
                console.log('initialize local stream success')

                this.localStream_.on('player-state-changed', event => {
                    console.log(
                        `local stream ${event.type} player is ${event.state}`
                    )
                })

                await this.publish()

                this.localStream_.play(this.streamDomId)
            } catch (e) {
                console.error('failed to initialize local stream - ' + e)
            }
        } catch (e) {
            console.error('join room failed! ' + e)
        }
        let states = this.client_.getRemoteMutedState()
        for (let state of states) {
            if (state.audioMuted) {
                console.log(state.userId)
            }
            if (state.videoMuted) {
                console.log('videoMuted', state.videoMuted)
                console.log(this.members_.get(state.userId).getId())
            }
        }
    }

    async leave() {
        if (!this.isJoined_) {
            console.warn('leave() - please join() firstly')
            return
        }
        await this.unpublish()

        // leave the room
        await this.client_.leave()

        this.localStream_.stop()
        this.localStream_.close()
        this.localStream_ = null
        this.isJoined_ = false
    }

    async publish() {
        if (!this.isJoined_) {
            console.warn('publish() - please join() firstly')
            return
        }
        if (this.isPublished_) {
            console.warn('duplicate RtcClient.publish() observed')
            return
        }
        try {
            await this.client_.publish(this.localStream_)
        } catch (e) {
            console.error('failed to publish local stream ' + e)
            this.isPublished_ = false
        }

        this.isPublished_ = true
    }

    async unpublish() {
        if (!this.isJoined_) {
            console.warn('unpublish() - please join() firstly')
            return
        }
        if (!this.isPublished_) {
            console.warn('RtcClient.unpublish() called but not published yet')
            return
        }

        await this.client_.unpublish(this.localStream_)
        this.isPublished_ = false
    }

    muteLocalAudio() {
        this.localStream_.muteAudio()
    }

    unmuteLocalAudio() {
        this.localStream_.unmuteAudio()
    }

    muteLocalVideo() {
        this.localStream_.muteVideo()
    }

    unmuteLocalVideo() {
        this.localStream_.unmuteVideo()
    }

    resumeStreams() {
        this.localStream_.resume()
        for (let stream of this.remoteStreams_) {
            stream.resume()
        }
    }

    handleEvents() {
        this.client_.on('error', err => {
            console.error(err)
            alert(err)
            // location.reload()
        })
        this.client_.on('peer-join', evt => {
            const userId = evt.userId
            console.log('peer-join ' + userId)
        })
        this.client_.on('peer-leave', evt => {
            const userId = evt.userId
            console.log('peer-leave ' + userId)
        })
        this.client_.on('stream-added', evt => {
            const remoteStream = evt.stream
            const id = remoteStream.getId()
            const userId = remoteStream.getUserId()
            this.members_.set(userId, remoteStream)
            console.log(
                `remote stream added: [${userId}] ID: ${id} type: ${remoteStream.getType()}`
            )
            if (remoteStream.getUserId() === 'shareUserId') {
                this.client_.unsubscribe(remoteStream)
            } else {
                console.log('subscribe to this remote stream')
                this.client_.subscribe(remoteStream)
            }
        })
        this.client_.on('stream-subscribed', evt => {
            const remoteStream = evt.stream
            const id = remoteStream.getId()
            this.remoteStreams_.push(remoteStream)
            remoteStream.on('player-state-changed', event => {
                console.log(`${event.type} player is ${event.state}`)
                if (event.type === 'video' && event.state === 'STOPPED') {
                    console.log('暂停')
                }
                if (event.type === 'video' && event.state === 'PLAYING') {
                    console.log('播放')
                }
            })
            remoteStream.play(this.clientDomId)
            console.log('stream-subscribed ID: ', id)
        })
        // fired when the remote stream is removed, e.g. the remote user called Client.unpublish()
        this.client_.on('stream-removed', evt => {
            const remoteStream = evt.stream
            const id = remoteStream.getId()
            remoteStream.stop()
            this.remoteStreams_ = this.remoteStreams_.filter(stream => {
                return stream.getId() !== id
            })
            console.log(
                `stream-removed ID: ${id}  type: ${remoteStream.getType()}`
            )
        })

        this.client_.on('stream-updated', evt => {
            const remoteStream = evt.stream
            let uid = this.getUidByStreamId(remoteStream.getId())
            if (!remoteStream.hasVideo()) {
                console.log(23)
            }
            console.log(
                'type: ' +
                    remoteStream.getType() +
                    ' stream-updated hasAudio: ' +
                    remoteStream.hasAudio() +
                    ' hasVideo: ' +
                    remoteStream.hasVideo() +
                    ' uid: ' +
                    uid
            )
        })

        this.client_.on('mute-audio', evt => {
            console.log(evt.userId + ' mute audio')
        })
        this.client_.on('unmute-audio', evt => {
            console.log(evt.userId + ' unmute audio')
        })
        this.client_.on('mute-video', evt => {
            console.log(evt.userId + ' mute video')
            let streamId = this.members_.get(evt.userId).getId()
            if (streamId) {
                // console.log()
            }
        })
        this.client_.on('unmute-video', evt => {
            console.log(evt.userId + ' unmute video')
            const stream = this.members_.get(evt.userId)
            if (stream) {
                let streamId = stream.getId()
                if (streamId) {
                    // console.log()
                }
            }
        })
    }

    showStreamState(stream) {
        console.log(
            'has audio: ' +
                stream.hasAudio() +
                ' has video: ' +
                stream.hasVideo()
        )
    }

    getUidByStreamId(streamId) {
        for (let [uid, stream] of this.members_) {
            if (stream.getId() === streamId) {
                return uid
            }
        }
    }
}

export default RtcClient
