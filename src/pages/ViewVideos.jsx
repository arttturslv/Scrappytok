import { act, useEffect, useReducer, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import Element from "../components/Element";
import { useShowData } from "../Hooks/useTikTokData";
export default function ViewVideos() {
    const [file, setFile] = useState('');
    const [focus, setFocus] = useState(null);
    const [filterNet, setFilterNet] = useState('normal');
    const { id } = useParams();
    const [localPreference, setLocalPreference] = useState(JSON.parse(localStorage.getItem(id)) ||
    {
        favorite: [],
        delete: [],
        normal: [],
    });

    const ACTIONS = {
        ALL: 'all',
        FAVORITE: 'favorite',
        DELETE: 'delete',
        CLEAR: 'clear'
    }

    const [preference, dispatch] = useReducer(reducer, localPreference);

    var customLink;

    useEffect(() => {
        setFile(useShowData(id)[0]);
    }, [id]);


    useEffect(() => {
        localStorage.setItem(id, JSON.stringify(preference));
    }, [preference]);

    function reducer(state, action) {
        switch (action.type) {
            case ACTIONS.FAVORITE:{
                if (Array.isArray(state.favorite)) {
                    const isDuplicate = state.favorite.some(fav => fav.Link === action.payload.data.Link);

                    if(Array.isArray(state.delete) && state.delete.length > 0) {
                        const hasOnDeleted = state.delete.some(del => del.Link === action.payload.data.Link);
                        if(hasOnDeleted) {                            
                            if (isDuplicate) {
                                return {
                                    ...state,
                                    favorite: state.favorite.filter(fav => fav.Link !== action.payload.data.Link),
                                    delete: state.delete.filter(del => del.Link !== action.payload.data.Link)
                                };
                            } else {
                                return {
                                    ...state,
                                    favorite: [...state.favorite, action.payload.data],
                                    delete: state.delete.filter(del => del.Link !== action.payload.data.Link)
                                };
                            }
                        }
                    } else if (isDuplicate) {
                        return {
                            ...state,
                            favorite: state.favorite.filter(fav => fav.Link !== action.payload.data.Link),
                        };
                    } else {
                        return {
                            ...state,
                            favorite: [...state.favorite, action.payload.data]
                        };
                    }
                } else {
                    console.log("state.favorite não é um array");
                }
            }
            case ACTIONS.DELETE:
                if (Array.isArray(state.delete)) {
                    const isDuplicate = state.delete.some(del => del.Link === action.payload.data.Link);

                    if(Array.isArray(state.favorite) && state.favorite.length > 0) {
                        const hasOnFavorite = state.favorite.some(fav => fav.Link === action.payload.data.Link);
                        if(hasOnFavorite) {                            
                            if (isDuplicate) {
                                return {
                                    ...state,
                                    favorite: state.favorite.filter(fav => fav.Link !== action.payload.data.Link),
                                    delete: state.delete?.filter(del => del.Link !== action.payload.data.Link)
                                };
                            } else {
                                return {
                                    ...state,
                                    delete: [...state.delete, action.payload.data],
                                    favorite: state.favorite.filter(fav => fav.Link !== action.payload.data.Link)
                                };
                            }
                        }
                    } else if (isDuplicate) {
                        return {
                            ...state,
                            delete: state.delete?.filter(del => del.Link !== action.payload.data.Link)
                        };
                        
                    } else {
                        return {
                            ...state,
                            delete: [...state.delete, action.payload.data]
                        };
                    }
                } else {
                    console.log("state.delete não é um array");
                }
            case ACTIONS.CLEAR:
                return {favorite: [], delete: [], normal: []}
            default:
                return "This action doesn't exist."
        }
    }

    return (
        <div className="flex mx-32 gap-8 md:flex-row items-center justify-center flex-wrap">
            <Header />

            <div className="w-full h-12 flex justify-evenly">
                <h1 className="font-bold text-xl bg-blue-400 h-fit px-8 py-2 cursor-pointer" onClick={() => setFilterNet('normal')}>👀 All</h1>
                <h1 className="font-bold text-xl bg-yellow-400 h-fit px-8 py-2  cursor-pointer" onClick={() => setFilterNet('favorite')}>⭐ Saved</h1>
                <h1 className="font-bold text-xl bg-red-400 h-fit px-8 py-2  cursor-pointer" onClick={() => setFilterNet('delete')}>🗑 Deleted</h1>
                <h1 className="font-bold text-xl bg-green-600 h-fit px-4 py-2  cursor-pointer" onClick={() => dispatch({type: ACTIONS.CLEAR})}>💾</h1>
            </div>

            <div className="flex flex-wrap transition-all duration-500 w-fit justify-center">
                {
                    filterNet == 'favorite' ?
                        preference.favorite.map((item, i) => {
                            if (id == 'Favorite Effects') {
                                customLink = item.EffectLink;
                            } else {
                                customLink = item.Link;
                            }
                            
                            return (
                                <div className="m-0 p-0" key={i} onClick={() => setFocus(i)}>
                                    <Element i={i} dispatch={dispatch} filterNet={filterNet} focus={focus} link={customLink} date={item.Date}></Element>
                                </div>
                            )
                        })
                        :
                        filterNet == 'delete' ?
                            preference.delete.map((item, i) => {
                                if (id == 'Favorite Effects') {
                                    customLink = item.EffectLink;
                                } else {
                                    customLink = item.Link;
                                }

                                return (
                                    <div className="m-0 p-0" key={i} onClick={() => setFocus(i)}>
                                        <Element i={i} dispatch={dispatch} filterNet={filterNet} focus={focus} link={customLink} date={item.Date}></Element>
                                    </div>
                                )
                            })
                            :
                            filterNet === 'normal' && file.length>0 ?
                                file.map((item, i) => {
                                    if (id == 'Favorite Effects') {
                                        customLink = item.EffectLink;
                                    } else {
                                        customLink = item.Link;
                                    }

                                    return (
                                        <div className="m-0 p-0" key={i} onClick={() => setFocus(i)}>
                                            <Element i={i} dispatch={dispatch} filterNet={filterNet} focus={focus} link={customLink} date={item.Date}></Element>
                                        </div>
                                    )
                                })
                                :
                                <></>
                }
            </div>

        </div>
    )
}