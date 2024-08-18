import React, {useState, useEffect} from 'react';
import { getAllOrders,updateOrderLevel } from '../../../api/admin';
import classes from "./AdminOrders.module.css";
const AdminOrders = () => {

  const [orders, setOrders] = useState();

  const [SlideInfo, setSlideInfo] = useState("Waiting");
  const [SlideStyle, setSlideStyle] = useState("");
  const [WaitingStyle, setWaitingStyle] = useState("solid 1px black");
  const [WorkStyle, setWorkStyle] = useState("");
  const [ComletedStyle, setComletedStyle] = useState("");
  const [Reload, setReload] = useState()
  
  let width = 800;

  useEffect(() => {
    const data = getAllOrders(localStorage.getItem("token"))
    data.then((result) => {
      setOrders(result)
      console.log(orders)
    })
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

  const UpdateOrderLevel = (e, id) => {
    e.preventDefault();
    updateOrderLevel(localStorage.getItem("token"), id)
  }



  if (orders) {
    return (
      <div className={classes.wrap}>
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
                    <div>Пользователь: {order.user.email}</div>
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
                  <div className={classes.button} onClick={(e) => UpdateOrderLevel(e, order.id)}> Подтвердить</div>
                </div>
              ))}
            </div>
            <div className={classes.work}>
            {orders[1].map((order) => (
                <div className={classes.module}>
                  <div className={classes.orderheader}>
                    <div>{order.date}</div>
                    <div>Сумма: {order.cell}</div>
                    <div>Пользователь: {order.user.email}</div>
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
                  <div className={classes.button} onClick={(e) => UpdateOrderLevel(e, order.id)}> Закончить</div>
                </div>
              ))}
            </div>
            <div className={classes.completed}>
              
            {orders[2].map((order) => (
                <div className={classes.module}>
                  <div className={classes.orderheader}>
                    <div>{order.date}</div>
                    <div>Сумма: {order.cell}</div>
                    <div>Пользователь: {order.user.email}</div>
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
export default AdminOrders;