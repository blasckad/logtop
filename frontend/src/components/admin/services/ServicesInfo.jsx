import React, {useState, useEffect} from 'react';
import classes from "./ServicesInfo.module.css";

const UpdateServices = () => {

    const [ServicesData, setServicesData] = useState([]);

    useEffect(() => {
        fetch("/api/servicesdata", {
            method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
            setServicesData(data)
            console.log(data)
        })
        .catch((error) => console.log(error));
    }, []);


  return (
    <div className={classes.wraporder}>
        {ServicesData.map((superType) => (
          <div
            key={superType["super_type_id"]}
            className={classes.wrapsupertype}
          >
            <div>{superType["super_type"]}, id: {superType["super_type_id"]}</div>

            {/* <div> */}
            {superType["data"].map((type) => (
              <div key={type["type_id"]} className={classes.wraptype}>
                <div>{type["type"]}, id: {type["type_id"]}</div>

                {/* <div> */}
                {type["data"].map((service) => (
                  <div key={service["id"]} className={classes.wrapservice}>
                    <div>{service["name"]}, id: {service["id"]}</div>
                    <div>стоимость: {service["cost"]}</div>
                  </div>
                ))}
                {/* </div> */}
              </div>
            ))}
            {/* </div> */}
          </div>
        ))}
      </div>
  );
};
export default UpdateServices;