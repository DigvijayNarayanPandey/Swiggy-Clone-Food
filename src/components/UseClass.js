import React from "react";

class UserClass extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
          count: 0,
          userinfo: {
            name: "Digvijay",
            location: "Sikkim",
            avatar_url:""
          },
        };   
        // console.log("child constructor");
    }

    async componentDidMount() {
        // console.log("child Component Did Mount");
        const data = await fetch("https://github.com/DigvijayNarayanPandey");
        const json = await data.json();
        this.setState({
            userinfo:json,
        })
    }

    render() {
        // console.log("child render");
        const { count } = this.state;
        const { name, location, avatar_url } = this.state.userinfo;

        return (
          <div className="usercard">
            <h2>Name: {name}</h2>
            <div>Count = {count}</div>
            <button
              onClick={() => {
                this.setState({
                  count: this.state.count + 1,
                });
              }}
            >
              +
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              onClick={() => {
                this.setState({
                  count: this.state.count - 1,
                });
              }}
            >
              -
            </button>
            <h3>Location: {location}</h3>
            <img width={85} src={avatar_url} />
            <h3>Contact: digvijaynarayanpandey7@gmail.com</h3>
          </div>
        );
    }
}

export default UserClass;