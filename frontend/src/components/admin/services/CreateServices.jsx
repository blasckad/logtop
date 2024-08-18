import React, {useState} from 'react';
import { saveservice } from '../../../api/admin';
import { token } from '../../../api/auth';
import classes from "./CreateServices.module.css";

const CreateServices = () => {
    const [IdService, SetIdService] = useState('')
    const [NameService, SetNameService] = useState()
    const [AnnotationService, SetAnnotationService] = useState('')
    const [IdTypeForService, setIdTypeForService] = useState()
    const [Cost, setCost] = useState()

    const [IdType, SetIdType] = useState('')
    const [NameType, SetNameType] = useState()
    const [AnnotationType, SetAnnotationType] = useState('')
    const [IdSuperTypeForType, SetIdSuperTypeForType] = useState()

    const [IdSuperType, SetIdSuperType] = useState('')
    const [NameSuperType, SetNameSuperType] = useState()
    const [AnnotationSuperType, SetAnnotationSuperType] = useState('')
    
    
   

    const Token = localStorage.getItem("token")


    const SaveSuper = (e) => {
        e.preventDefault()
        const data = {
            "id": IdSuperType,
            "type": "super", 
            "name": NameSuperType, 
            "annotation": AnnotationSuperType}
        console.log(saveservice(Token, data))
    }
    const SaveType = (e) => {
        e.preventDefault()
        const data = {
            "id": IdType,
            "type": "type", 
            "name": NameType, 
            "annotation": AnnotationType,
            "super_type_id": IdSuperTypeForType}
        saveservice(Token, data)  
    }
    const SaveService = (e) => {
        e.preventDefault()
        const data = {
            "id": IdService,
            "type": "service", 
            "name": NameService, 
            "annotation": AnnotationService,
            "cost": Cost, 
            "type_id": IdTypeForService,}
        saveservice(Token, data)
    }

  return (
    <div className={classes.wrap}>
        <div className={classes.module}>
            <div className={classes.header}>Супер тип</div> 
            <div className={classes.p}>id: <input value={IdSuperType} onChange={e => SetIdSuperType(e.target.value)}/></div>
            <div className={classes.p}>Название: <input value={NameSuperType} onChange={e => SetNameSuperType(e.target.value)}/></div>
            <div className={classes.p}>Аннотация: <input value={AnnotationSuperType}  onChange={e => SetAnnotationSuperType(e.target.value)}/></div>
            <div className={classes.p}><button onClick={SaveSuper} className={classes.btn}>Сохранить</button></div>
        </div>
        <div className={classes.module}>
            <div className={classes.header}>Тип</div> 
            <div className={classes.p}>id: <input value={IdType} onChange={e => SetIdType(e.target.value)}/></div>
            <div className={classes.p}>Название: <input value={NameType} onChange={e => SetNameType(e.target.value)}/></div>
            <div className={classes.p}>Аннотация: <input value={AnnotationType}  onChange={e => SetAnnotationType(e.target.value)}/></div>
            <div className={classes.p}>id супер типа: <input value={IdSuperTypeForType}  onChange={e => SetIdSuperTypeForType(e.target.value)}/></div>
            <div className={classes.p}><button onClick={SaveType} className={classes.btn}>Сохранить</button> </div>
        </div>
        <div className={classes.module}>
            <div className={classes.header}>Услуга</div> 
            <div className={classes.p}>id: <input value={IdService} onChange={e => SetIdService(e.target.value)}/></div>
            <div className={classes.p}>Название: <input value={NameService} onChange={e => SetNameService(e.target.value)}/></div>
            <div className={classes.p}>Аннотация: <input value={AnnotationService}  onChange={e => SetAnnotationService(e.target.value)}/></div>
            <div className={classes.p}>id типа: <input value={IdTypeForService}  onChange={e => setIdTypeForService(e.target.value)}/></div>
            <div className={classes.p}>цена: <input value={Cost}  onChange={e => setCost(e.target.value)}/></div>
            <div className={classes.wrapbtn}><button onClick={SaveService} className={classes.btn}>Сохранить</button></div>
        </div>
    </div>
  );
};
export default CreateServices;