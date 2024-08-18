import React, { useState, useEffect, useContext } from "react";
import { getOrders, deleteOrder } from "../../api/orders";
import classes from "./Orders.module.css";
import { ReloadContext } from "../../App";

const Orders = () => {
  const [orders, setOrders] = useState();

  

  const [SlideInfo, setSlideInfo] = useState("Waiting");
  const [SlideStyle, setSlideStyle] = useState("");
  const [WaitingStyle, setWaitingStyle] = useState("solid 1px black");
  const [WorkStyle, setWorkStyle] = useState("");
  const [ComletedStyle, setComletedStyle] = useState("");
  const [Reload, setReload] = useState()
  
  let width = 800;

  // const [ReloadState, setReloadState] = useState();

  // const { Reload } = useContext(ReloadContext);

  // if (Reload) {
  //   setReloadState(true);
  // }

  useEffect(() => {
    const data = getOrders(localStorage.getItem("token"));
    data.then((result) => {
      setOrders(result);
      console.log(result);
    });
  }, []);

  const SlideToWaiting = (e) => {
    e.preventDefault();
    if (SlideInfo !== "Waiting") {
      setSlideInfo("Waiting");
      setSlideStyle("");
      setWorkStyle("");
      setComletedStyle("");
      setWaitingStyle("solid 1px black");
    }
  };

  const SlideToWork = (e) => {
    e.preventDefault();
    if (SlideInfo !== "Work") {
      setSlideInfo("Work");
      setSlideStyle("translateX(-" + width + "px");
      setWorkStyle("solid 1px black");
      setComletedStyle("");
      setWaitingStyle("");
    }
  };

  const SlideToComleted = (e) => {
    e.preventDefault();
    if (SlideInfo !== "Comleted") {
      setSlideInfo("Comleted");
      setSlideStyle("translateX(-" + width*2 + "px");
      setWorkStyle("");
      setComletedStyle("solid 1px black");
      setWaitingStyle("");
    }
  };

  const DeleteOrder = (e, id) => {
    e.preventDefault();
    setReload(true)
    deleteOrder(localStorage.getItem("token"), id)
  }

  if (orders) {
    return (
      <div className={classes.wrap} id="orders">
        <div className={classes.header}>
          <div onClick={SlideToWaiting}>
            <div style={{ borderBottom: WaitingStyle }}>Ждет подтверждения</div>
          </div>
          <div onClick={SlideToWork}>
            <div style={{ borderBottom: WorkStyle }}>В работе</div>
          </div>
          <div onClick={SlideToComleted}>
            <div style={{ borderBottom: ComletedStyle }}>Окончено</div>
          </div>
        </div>
        <div className={classes.wrapwrapcontent}>
          <div className={classes.wrapcontent} style={{ transform: SlideStyle }}>
            <div className={classes.waiting}>
              {orders[0].map((order) => (
                <div className={classes.module}>
                  <div className={classes.orderheader}>
                    <div>{order.date}</div>
                    <div>Сумма: {order.cell}</div>
                  </div>   
                  <div className={classes.wraporderinfo}>
                    {order.data.map((orderInfo) => (
                      <div className={classes.orderinfo}>
                        <div className={classes.supertype}>{orderInfo.super_type}</div>
                        <div className={classes.type}>{orderInfo.type}</div>
                        <div className={classes.service}>{orderInfo.service}</div>
                        <div className={classes.count}> <div className={classes.countdata}>{orderInfo.count}</div> <div className={classes.count}>Количество</div></div>
                      </div>
                    ))}
                  </div>
                  <div className={classes.note}>Дополнительно: {order.note} </div>
                  <div className={classes.delete} onClick={(e) => DeleteOrder(e, order.id)}> Удалить</div>
                </div>
              ))}
            </div>
            <div className={classes.work}>
            {orders[1].map((order) => (
                <div className={classes.module}>
                  <div className={classes.orderheader}>
                    <div>{order.date}</div>
                    <div>Сумма: {order.cell}</div>
                  </div>   
                  <div className={classes.wraporderinfo}>
                    {order.data.map((orderInfo) => (
                      <div className={classes.orderinfo}>
                        <div className={classes.supertype}>{orderInfo.super_type}</div>
                        <div className={classes.type}>{orderInfo.type}</div>
                        <div className={classes.service}>{orderInfo.service}</div>
                        <div className={classes.count}> <div className={classes.countdata}>{orderInfo.count}</div> <div className={classes.count}>Количество</div></div>
                      </div>
                    ))}
                  </div>
                  <div className={classes.note}>Дополнительно: {order.note} </div>
                </div>
              ))}
            </div>
            <div className={classes.completed}>
              {/* <Module orders={orders[2]}/> */}
              {orders[2].map((order) => (
                <div className={classes.module}>
                  <div className={classes.orderheader}>
                    <div>{order.date}</div>
                    <div>Сумма: {order.cell}</div>
                  </div>   
                  <div className={classes.wraporderinfo}>
                    {order.data.map((orderInfo) => (
                      <div className={classes.orderinfo}>
                        <div className={classes.supertype}>{orderInfo.super_type}</div>
                        <div className={classes.type}>{orderInfo.type}</div>
                        <div className={classes.service}>{orderInfo.service}</div>
                        <div className={classes.count}> <div className={classes.countdata}>{orderInfo.count}</div> <div className={classes.count}>Количество</div></div>
                      </div>
                    ))}
                  </div>
                  <div className={classes.note}>Дополнительно: {order.note} </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// const Module = ({orders}) => {
//   return (
//     {orders.map((order) => (
//       <div>
//         <div>
//           {order.date},
//           {order.note}, {order.cell}
//         </div>
//         <div>
//           {order.data.map((orderInfo) => (
//             <div>
//               {orderInfo.super_type}/{orderInfo.type}/
//               {orderInfo.service} - {orderInfo.count}
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}
//   )
// }

export default Orders;
