import React from "react"

export const NavbarComponent = (props) => {

    return (
        <React.Fragment>
            <head>
                <link rel="stylesheet" href="css/widget.css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
                <link rel="stylesheet" type="text/css" href="css/index.css" />

                <title>Tabu-ulate</title>
                <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
            </head>

            <body>
                <header>
                    <nav className="navbar navbar-expand-sm">
                        <a className="navbar-brand" href="#">Tabulate</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item ">
                                    <a className="nav-link" href="#">dashboard<span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">analytics</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">settings</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="login.html">sign out</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="modal" data-target="#newGroupingModal">
                                        new group
            </a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                </header>

                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                    integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                    crossOrigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                    integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                    crossOrigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
                    integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                    crossOrigin="anonymous"></script>
            </body>
        </React.Fragment>
    )
}