import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timeInSeconds: 0, timeInMinutes: 25}

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 1) {
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timeInMinutes: prevState.timeInMinutes + 1,
    }))
  }

  renderTimerLimitContainer = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isButtonsDisabled = timeInSeconds > 0
    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timeInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  ResetTimer = () => {
    this.clearTimerInterval()
    this.setState({timeInMinutes: 25, timeInSeconds: 0, isTimerRunning: false})
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const TimerCompleted = timeInMinutes === timeInSeconds * 60

    if (TimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  StartOrPauseTimer = () => {
    const {isTimerRunning, timeInSeconds, timeInMinutes} = this.state
    const isTimerCompleted = timeInSeconds === timeInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerContainer = () => {
    const {isTimerRunning} = this.state
    const imgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="timer-container">
        <div>
          <button
            type="button"
            className="button"
            onClick={this.StartOrPauseTimer}
          >
            <img src={imgUrl} alt={altText} className="img" />
            <p className="timer-text">{isTimerRunning ? 'Pause' : 'Start'}</p>
          </button>
        </div>
        <button type="button" className="button" onClick={this.ResetTimer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="img"
            alt="reset icon"
          />
        </button>
        <p className="timer-text">Reset</p>
      </div>
    )
  }

  getTimeElaspedInSeconds = () => {
    const {timeInSeconds, timeInMinutes} = this.state
    const totalRemainingSeconds = timeInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    const time = this.getTimeElaspedInSeconds()
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="flex">
          <div className="bg-container">
            <div className="card">
              <h1 className="timer">{time}</h1>
              <p>{labelText}</p>
            </div>
          </div>
          <div>
            {this.renderTimerContainer()}
            {this.renderTimerLimitContainer()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
