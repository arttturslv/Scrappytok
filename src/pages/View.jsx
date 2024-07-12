import { useEffect, useReducer, useState } from "react";
import Header from "../components/Header";
import { Link, useParams,useNavigate } from "react-router-dom";
import Element from "../components/Element";
import { useShowData } from "../Hooks/useTikTokData";
import OptionsButtons from "../components/OptionsButtons";
import ArrowIcon from '../assets/arrow-icon.svg'

export default function View() {
    const navigate = useNavigate()
    const [file, setFile] = useState('');
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

    useEffect(() => {
        if(id=="Following List" || id=="Follower List") {
            setFile(useShowData(id)[1]);
        } else {
            setFile(useShowData(id)[0]);
        }
    }, [id]);


    useEffect(() => {
        localStorage.setItem(id, JSON.stringify(preference));
    }, [preference]);

    function reducer(state, action) {
        switch (action.type) {
            case ACTIONS.FAVORITE: {
                if (Array.isArray(state.favorite)) {
                    const isDuplicate = state.favorite.some(fav => fav.Link === action.payload.data.Link);

                    if (Array.isArray(state.delete) && state.delete.length > 0) {
                        const hasOnDeleted = state.delete.some(del => del.Link === action.payload.data.Link);
                        if (hasOnDeleted) {
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

                    if (Array.isArray(state.favorite) && state.favorite.length > 0) {
                        const hasOnFavorite = state.favorite.some(fav => fav.Link === action.payload.data.Link);
                        if (hasOnFavorite) {
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
                return { favorite: [], delete: [], normal: [] }
            default:
                return "This action doesn't exist."
        }
    }

    return (
        <div className="flex flex-col mx-32 max-md:mx-8 gap-8 items-center justify-center flex-wrap">
            <Header />
            <Link to={'..'}
                onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }} 
                className="flex gap-4 w-full mt-20  hover:pl-1 transition-all">
                <img className="w-8 rotate-90" src={ArrowIcon} alt="Icone de uma seta" />
                <h1 className="text-5xl  max-sm:text-3xl">{id}</h1>
            </Link>

            <OptionsButtons setFilterNet={setFilterNet}></OptionsButtons>

            <div className="flex flex-wrap transition-all duration-500 gap-2 w-fit justify-center">
                {
                    filterNet == 'favorite' ?
                        renderElements(preference.favorite, dispatch, id)
                    :
                    filterNet == 'delete' ?
                        renderElements(preference.delete, dispatch, id)
                    :
                    filterNet === 'normal' && file.length > 0&&
                        renderElements(file, dispatch, id)
                }

            </div>
        </div>
    )
}

function renderElements(files, dispatch, id) {
    return files.map((item, index) => {
        return (
            <div className="m-0 p-0" key={index}>
                <Element type={id} dispatch={dispatch} item={item}></Element>
            </div>
        )
    })
}