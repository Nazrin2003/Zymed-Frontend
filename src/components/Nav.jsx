import React from 'react';
import '../styles/nav.css'; // Import custom styles

const Nav = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><h1>Zymed</h1></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                            <a className="nav-link" href="#">Medicines</a>
                            <a className="nav-link" href="#">Orders</a>
                            <a className="nav-link" href="#">Subscriptions</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Nav;
