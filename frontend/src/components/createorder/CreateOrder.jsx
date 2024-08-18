import React, { useState, useEffect, useCallback, useContext } from "react";
import { createOrder } from "../../api/orders";
import { AuthContext } from "../../App";
import classes from "./CreateOrder.module.css";

const CreateOrder = () => {
  const [ServicesData, setServicesData] = useState([]);
  // const [Order, setOrder] = useState({});
  const [Sum, setSum] = useState({});
  const [Note, SetNote] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    fetch("/api/servicesdata", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setServicesData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  //  function changeCount(event) {
  //     setOrder(Order => ({...Order, [event.target.id]: event.target.value}))

  //     setSum(Sum => ({...Sum,[event.target.id]: event.target.value * event.target.name}))
  //  }

  const changeCount = useCallback((e, id, type, superType, cost) => {
    setServicesData((ServicesData) =>
      ServicesData.map((Super) => {
        if (Super.super_type_id === superType) {
          Super.data.map((Type) => {
            if (Type.type_id === type) {
              Type.data.map((s) => {
                if (s.id === id) s.count = e.target.value;
                return s;
              });
            }
            return type;
          });
        }
        return Super;
      })
    );
    setSum((Sum) => ({ ...Sum, [id]: e.target.value * cost }));
  }, []);

  const SendOrder = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      createOrder(
        localStorage.getItem("token"),
        new Date(),
        Note,
        ServicesData
      );
    }
  };

  function CalcSum() {
    let summa = 0;
    for (const [key, value] of Object.entries(Sum)) {
      summa += value;
    }

    return <div>{summa}</div>;
  }

  return (
    <div className={classes.wrap} id="createorder">
      <div className={classes.wraporder}>
        {ServicesData.map((superType) => (
          <div
            key={superType["super_type_id"]}
            className={classes.wrapsupertype}
          >
            <div>{superType["super_type"]}</div>

            {/* <div> */}
            {superType["data"].map((type) => (
              <div key={type["type_id"]} className={classes.wraptype}>
                <div>{type["type"]}</div>

                {/* <div> */}
                {type["data"].map((service) => (
                  <div key={service["id"]} className={classes.wrapservice}>
                    <div>{service["name"]}</div>
                    <div><div>{service["cost"]}</div><div className={classes.annotation}>руб.</div></div>
                    <div>
                      <div>
                    <input
                      className={classes.count}
                      type="number"
                      value={service.count}
                      onChange={(e) =>
                        changeCount(
                          e,
                          service.id,
                          type.type_id,
                          superType.super_type_id,
                          service.cost
                        )
                      }
                      placeholder="0"
                    ></input></div>
                    </div>
                  </div>
                ))}
                {/* </div> */}
              </div>
            ))}
            {/* </div> */}
          </div>
        ))}
      </div>
      <div className={classes.wrapsum}>
        Предварительная стоимость:{" "}
        <div className={classes.sum}>
          <CalcSum />
        </div>
      </div>
      <textarea
        type="text"
        placeholder="Примечания"
        value={Note}
        onChange={(e) => SetNote(e.target.value)}
        className={classes.note}
      ></textarea>
      <button className={classes.btn} onClick={SendOrder}>
        Сделать заказ
      </button>
    </div>
  );
};
export default CreateOrder;
