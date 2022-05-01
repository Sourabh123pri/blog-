import React from 'react'
import {NavLink} from 'react-router-dom'
import img from "./Sourabh.jpg"
const About = () => {
  return (
    <>
    <div className="about container">
      <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark my-3">
        <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic">This is Blog post site </h1>
          <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.</p>
          <p className="lead mb-0"><NavLink to="/" className="text-white font-weight-bold">Continue reading...</NavLink></p>
        </div>
      </div>
      </div>
      <div className=" container">
        <div className="col-md-6">
          <div className="card flex-md-row mb-4 box-shadow h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
              <strong className="d-inline-block mb-2 text-primary">Sourabh kumar</strong>
              <h3 className="mb-0">
                <NavLink className="text-dark" to="/">This site for all user</NavLink>
              </h3>
              <p className="card-text mb-auto">Hey this site is use all person Only Register and Use . and thanks </p>
              <NavLink to="/">Read Blog...</NavLink>
            </div>
            <img className="card-img-right flex-auto d-none d-md-block" src={img}  alt="Card image cap" style={{height:"12rem"}}/>
          </div>
        </div>
    </div>


      </>
  )
}

export default About