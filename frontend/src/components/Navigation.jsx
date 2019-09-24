import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Menu, StoreMallDirectory as Stores, Terrain, Money } from "@material-ui/icons";

const actions = [
    { icon: <Stores />, name: "Store Map", value: "/" },
    { icon: <Money />, name: "Loan Table", value: "/loan-table" },
    { icon: <Terrain />, name: "Earthquakes", value: "/earthquake-map" }
]

const Navigation = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <SpeedDial
            ariaLabel="navigation"
            style={{ position: "absolute", top: 16, left: 16 }}
            icon={<Menu />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="down"
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
        </SpeedDial>
    )
}

export default Navigation;