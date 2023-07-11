import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as PartActions from "../../store/part";
import { useHistory } from "react-router-dom";

function CreateKeebPage() {
    const [keeb, setKeeb] = useState();
    const [keebImg, setKeebImg] = useState();

    const [name, setName] = useState("");
    const [keebcase, setKeebcase] = useState("");
    const [keycaps, setKeycaps] = useState("");
    const [switches, setSwitches] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();
}
