import React, { useState } from "react"

export default function Test() {
    //original data
    const states = [
        "Abia",
        "Adamawa",
        "Akwa Ibom",
        "Anambra",
        "Bauchi",
        "Bayelsa",
        "Benue",
        "Borno",
        "Cross River",
        "Delta",
        "Ebonyi",
        "Edo",
        "Ekiti",
        "Enugu",
        "Gombe",
        "Imo",
        "Jigawa",
        "Kaduna",
        "Kano",
        "Katsina",
        "Kebbi",
        "Kogi",
        "Kwara",
        "Lagos",
        "Nasarawa",
        "Niger",
        "Ogun",
        "Ondo",
        "Osun",
        "Oyo",
        "Plateau",
        "Rivers",
        "Sokoto",
        "Taraba",
        "Yobe",
        "Zamfara"
    ]

    //create a state
    const [data, setData] = useState(states)
    //function to handle the search operation
    const doSearch = (e) => {
        //get the search term
        const inputValue = e.target.value;
        //check if its empty
        if (inputValue.trim() !== "") {
            //variable to store the matching items
            const search = states.filter(el => {
                //match the current item against the input value
                return el.match(new RegExp(inputValue, 'i'))
            })
            //update the state to use search data
            setData(search);
        } else {
            //update the state to use original data
            setData(states)
        }
    }
    return (
        <div style={{ maxWidth: "700px", margin: "auto" }}>
            <div className="mb-3">
                <label className="label">Search for a state</label>
                <input onChange={doSearch} className="input mb-3" type="search" placeholder="Enter a state to begin search" />
            </div>

            <table className="table is-bordered is-fullwidth">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (data.length !== 0) ?
                        data.map((item, ind) => {
                            return (
                                <tr>
                                    <td>
                                        {++ind}
                                    </td>
                                    <td>
                                        {item}
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <tr>
                            <td colSpan={2} className="has-text-centered">
                                No data found
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}