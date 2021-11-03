import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Chuck from './assets/chuck.jpg'

import './App.css'

function App() {
  const [state, setState] = useState({
    joke: '',
    searchKeyword: '',
    searchUrl: 'https://api.chucknorris.io/jokes/search?query=',
    error: '',
  })
  const disabledButton = state.searchKeyword.length < 3 || state.searchKeyword.length > 120

  const fetchData = async () => {
    try {
      const result = await axios.get('https://api.chucknorris.io/jokes/random')
      setState({
        ...state,
        joke: result.data.value,
      })
    } catch (e) {
      if (e) {
        setState({
          ...state,
          error: 'Not a valid word',
        })
      }
    }
  }

  const searchJoke = (event) => {
    setState({
      ...state,
      searchKeyword: event.target.value,
      error: '',
    })
  }

  const fetchMyJoke = async () => {
    try {
      const result = await axios.get(state.searchUrl + state.searchKeyword)

      const jokePosition = Math.floor(Math.random() * result.data.result.length)
      // Math.random() -> Random number between 0 - 0.9999
      // Math.random()*3 -> Random number between 0 - 2.9999
      // Math.floor(Math.random()*3) -> Random number between 0 - 2

      setState({
        ...state,
        joke: result.data.result[jokePosition].value,
      })
    } catch (e) {
      if (e) {
        setState({
          ...state,
          error: 'Not a valid word',
        })
      }
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container">
      <header>
        <h1 className="title">Chuck Norris API</h1>
      </header>

      <div className="row">
        <div className="col-6">
          <img src={Chuck} alt="Chuck Norris" />
        </div>

        <div className="col-6 searchJokeCol">
          <div className="card">
            <div className="card-header">Search for a word</div>
            <div className="card-body">
              <input type="text" onChange={searchJoke} />
            </div>
          </div>

          <div>
            <button className="btn btn-warning btn-lg" disabled={disabledButton} onClick={fetchMyJoke}>
              Generate Joke
            </button>
            <p className="error">{state.error}</p>
          </div>
        </div>
      </div>

      <h2 className="subTitle">Here is the joke:</h2>
      <h4>{`"${state.joke}"`}</h4>
    </div>
  )
}

export default App
