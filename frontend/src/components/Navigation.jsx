import React, { Fragment, useState } from 'react'
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Menu, StoreMallDirectory as Stores, Terrain, Money } from "@material-ui/icons";
import { withRouter } from "react-router-dom";

const actions = [
    { icon: <Stores />, name: "Store Map", value: "/" },
    { icon: <Money />, name: "Loan Table", value: "/loan-table" },
    { icon: <Terrain />, name: "Earthquakes", value: "/earthquake-map" }
]
const NavigationWithRouter = withRouter(props => <Navigation {...props} />)

const Navigation = ({ location }) => {
    const { pathname } = location;
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Fragment>
            <AppBar position="static"> <Toolbar>
                <Typography variant="h6" >
                    {pathname === "/" ? "Store Map" : pathname === "/loan-table" ? "Loan Data" : "Earthquakes"}
                </Typography>
            </Toolbar>
            </AppBar>
            <SpeedDial
                ariaLabel="navigation"
                style={{ position: "absolute", bottom: 16, left: 16 }}
                icon={<Menu />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="up"
            >
                {actions.map(action => {
                    const { icon, name, value } = action;
                    return <SpeedDialAction
                        href={value}
                        key={name}
                        icon={icon}
                        tooltipTitle={name}
                    />
                }
                )}
            </SpeedDial></Fragment>
    )
}

export default NavigationWithRouter;