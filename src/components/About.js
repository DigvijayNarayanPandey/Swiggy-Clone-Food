import React from 'react'
// import User from './User'
import UserClass from './UseClass';


class About extends React.Component{

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // console.log("parent component Did Mount");
  }
  render() {
    // console.log("parent render");
    return (
      <div>
        <h1>This is About Page</h1>
        {}
        <UserClass name={"Digvijay (class compo)"} />
      </div>

    );
  }
}

export default About;