import React, { useState, useContext } from 'react';
import { DataContext } from '../utils/context';
import { v4 as uuid } from 'uuid';

function Component() {

    const { datas, setData } = useContext(DataContext);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [isDataEditing, setIsDataEditing] = useState(false);
    const [editDataId, setEditDataId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(firstname && lastname && isDataEditing) {
            setData(
              datas.map((data) => {
                if(data.id === editDataId) {
                  return {...data, firstname: firstname, lastname: lastname}
                }
                return data;
              })
            );
            setFirstname('')
            setLastname('')
            setEditDataId(null);
            setIsDataEditing(false);
        } else if(firstname !== '' && lastname !== '') {
            const newData = {
                id: uuid(),
                firstname: firstname,
                lastname: lastname
            }
            setData([...datas, newData])
            setFirstname('')
            setLastname('')
        }
    }

    const updateData = (id) => {
        const updateData = datas.find((data) => data.id === id);
        setIsDataEditing(true);
        setEditDataId(id);
        setFirstname(updateData.firstname)
        setLastname(updateData.lastname)
    }

    const deleteData = (id) => {
        setData(datas.filter((data) => data.id !== id));
        setFirstname('');
        setLastname('');
    }

    console.log(datas)

    return (
        <div className='container'>
            <h1>Exercice d'utilisation de context</h1>
            <h2>Utilisation d'un context pour l'ajout d'un item dans une liste</h2>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">Prénom</label>
                    <input
                        name='firstname'
                        type="text"
                        onChange={e => setFirstname(e.target.value)}
                        value={firstname}
                    />
                    <label htmlFor="lastname">Nom</label>
                    <input
                        name='lastname'
                        type="text"
                        onChange={e => setLastname(e.target.value)}
                        value={lastname}
                    />
                    <button type='submit'>
                        {isDataEditing ? "Modifier" : "Soumettre"}
                    </button>
                </form>
            </div>
            <div className='container'>
                {datas
                    ? (
                        <ul className='results'>
                            {datas.map((data, index) => (
                                <div key={data.id} className='container__item'>
                                    <li>{data.firstname} {data.lastname}</li>
                                    <button onClick={() => updateData(data.id)}>Modifier</button>
                                    <button onClick={() => deleteData(data.id)}>Supprimer</button>
                                </div>
                            ))}
                        </ul>
                    )
                    : null

                }
            </div>
        </div>
    )
}

export default Component