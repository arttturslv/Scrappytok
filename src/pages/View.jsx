import { useEffect, useReducer, useState } from "react";
import Header from "../components/Header";
import { Link, useParams,useNavigate } from "react-router-dom";
import Element from "../components/Element";
import { useShowData, useLocalFavorites } from "../Hooks/useTikTokData";
import OptionsButtons from "../components/OptionsButtons";
import ArrowIcon from '../assets/arrow-icon.svg'

export default function View() {
    const navigate = useNavigate()
    const [file, setFile] = useState('');
    const [lastInteraction, setLastInteraction] = useState(null)
    const [filterNet, setFilterNet] = useState('normal');
    const { id } = useParams();

    const [localPreference, setLocalPreference] = useState(useLocalFavorites(id) ||
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
            setLocalPreference(useLocalFavorites(id))
        } else {
            setFile(useShowData(id)[0]);
        }
    }, [id]);


    useEffect(() => {
        var ScrappyTok = JSON.parse(localStorage.getItem("ScrappyTok"));
        ScrappyTok[id] = preference;
        localStorage.setItem('ScrappyTok', JSON.stringify(ScrappyTok));
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
        <div className="w-full max-w-[1440px] mx-auto flex flex-col px-32 max-md:px-8 gap-8 items-center justify-center flex-wrap">
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
                        renderElements(preference.favorite, dispatch, id, lastInteraction, setLastInteraction)
                    :
                    filterNet == 'delete' ?
                        renderElements(preference.delete, dispatch, id, lastInteraction, setLastInteraction)
                    :
                    filterNet === 'normal' && file.length > 0 &&
                        renderAll(file, dispatch, id, lastInteraction, setLastInteraction, preference)
                }

            </div>
        </div>
    )
}

function renderElements(files, dispatch, id, lastInteraction, setLastInteraction) {
    return files.map((item, index) => {
        return (
            <div onClick={()=> setLastInteraction(index)} className="m-0 p-0" key={index}>
                <Element lastInteraction={{fn:lastInteraction, index: index}} type={id} dispatch={dispatch} item={item}></Element>
            </div>
        )
    })
}

function renderAll(files, dispatch, id, lastInteraction, setLastInteraction, preference) {
    var filtered = files;

    if (preference.favorite.length != 0) {
        filtered = filtered.filter((el) => {
            return !preference.favorite.some((fav) => {
                return fav.Link === el.Link;
            });
        });
    }

    if (preference.delete.length != 0) {
        filtered = filtered.filter((el) => {
            return !preference.delete.some((del) => {
                return del.Link === el.Link;
            });
        });
    }

    return filtered.map((item, index) => {
        return (
            <div onClick={() => setLastInteraction(index)} className="m-0 p-0" key={index}>
                <Element lastInteraction={{ fn: lastInteraction, index: index }} type={id} dispatch={dispatch} item={item} />
            </div>
        );
    });
}

