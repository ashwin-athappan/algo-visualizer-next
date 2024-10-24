import React, {useState, useEffect} from 'react';
import styles from './Bar.module.css';

interface barInterface {
    index: number;
    length: number;
    color: number;
    changeArray: (index: number, value: number) => void;
}

const Bars = (props: barInterface) => {
    const {index, length, color, changeArray} = props;
    const [len, setLength] = useState(length);
    useEffect(() => {
        setLength(length);
    }, [length]);

    const colors = [
        '#40514e',
        '#2f89fc',
        '#30e3ca',
        '#ff304f',
        '#f99417',
        '#0D1282'];

    let barStyle = {
        background: colors[color],
        height: length,
        marginTop: 200 - length,
    };

    let textStyle: React.CSSProperties = {
        position: 'relative',
        top: Math.floor(length / 2) - 26,
        width: length,
        left: -Math.floor(length / 2) + 12,
        background: 'transparent',
        border: 'none',

    };

    let modifiersStyle: React.CSSProperties = {
        position: 'relative',
        top: length - 5,
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        if (val === '') {
            setLength(0);
            changeArray(index, 0);
        } else {
            let intVal = parseInt(val);
            if (intVal > 200) {
                setLength(200);
                changeArray(index, 200);
            } else {
                setLength(intVal);
                changeArray(index, intVal);
            }
        }
    };

    const increment = () => {
        setLength(len + 1);
        changeArray(index, len + 1);
    };

    const decrement = () => {
        setLength(len - 1);
        changeArray(index, len - 1);
    };

    return (
        <div className={styles.bar} style={barStyle}>
            <input
                type='number'
                style={textStyle}
                value={len}
                className={styles.text + ' ' + styles.elementInputs}
                onChange={handleChange}
            />
            <div className='quantity-nav'>
                <div
                    className={styles.quantityButton + ' quantity-up'}
                    style={modifiersStyle}
                    onClick={increment}
                >
                    +
                </div>
                <div
                    className={styles.quantityButton + ' quantity-down'}
                    style={modifiersStyle}
                    onClick={decrement}
                >
                    -
                </div>
            </div>
        </div>
    );
};

export default Bars;