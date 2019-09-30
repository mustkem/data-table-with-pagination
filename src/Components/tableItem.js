import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class tableItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <li className="list-item clearfix">
                <Link to={'/user/' + this.props.item.id}>
                    <div className="data-item first-name">

                        {
                            this.props.item.first_name
                        }
                    </div>
                    <div className="data-item last-name">
                        {
                            this.props.item.last_name
                        }
                    </div>
                    <div className="data-item company-name">
                        {
                            this.props.item.company_name
                        }
                    </div>
                    <div className="data-item city">
                        {
                            this.props.item.city
                        }
                    </div>
                    <div className="data-item state">
                        {
                            this.props.item.state
                        }
                    </div>
                    <div className="data-item zip">
                        {
                            this.props.item.zip
                        }
                    </div>
                    <div className="data-item email">
                        {
                            this.props.item.email
                        }
                    </div>
                    <div className="data-item web">
                        {
                            this.props.item.web
                        }
                    </div>
                    <div className="data-item age">
                        {
                            this.props.item.age
                        }
                    </div>
                </Link>
            </li>
        );
    }
}

export default tableItem;