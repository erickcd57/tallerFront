import React, { Component } from 'react';
import { Modal, ModalFooter, ModalHeader, ModalBody, Button, Label, Table } from 'reactstrap';
import './css/bootstrap.css';
import './css/Modal2.css';

class MyModal extends Component {

    constructor() {
        super();
        //  this.handlerGuardar=this.handlerGuardar.bind(this);
        this.texto = React.createRef();
        this.sumaTotalSoles = this.sumaTotalSoles.bind(this);
        this.sumaTotalDolares = this.sumaTotalDolares.bind(this);
        this.close = this.close.bind(this);
        //   this.alterarArray = this.alterarArray.bind(this)
        this.state = {
            data: null,
            dataAlterar: null,
            index: 0,
            modal: false
        }
    }
    componentWillMount() {
        const { text, nombre, codigo, estado } = this.props;
        let arre = [];
        //  console.log(text);
        let i = 0;

        //console.log(text[Object.keys(text)[0]]);
        if (codigo !== "0") {
            Object.keys(text).map((data, index) => {
                if (data === codigo) {
                    i = index;
                }
                return null;
            });
            arre = text[Object.keys(text)[i]].sort((a, b) => {
                if (a.concepto > b.concepto) {
                    return 1;
                }
                if (a.concepto < b.concepto) {
                    return -1;
                }
                //iguales
                return 0;
            });
        } else {
            Object.keys(text).map((data, index) => {
                if (data === nombre) {
                    i = index;
                }
                return null;
            });
            arre = text[Object.keys(text)[i]].sort((a, b) => {
                if (a.nombre > b.nombre) {
                    return 1;
                }
                if (a.nombre < b.nombre) {
                    return -1;
                }
                //iguales
                return 0;
            });
        }
        //console.log(i);
        this.setState({
            data: arre,
            dataAlterar: [...arre],
            index: i,
            modal: estado
        });
        // console.log(text["FLORES RAMIREZ MARTHA POLI"]);
        // console.log(text[Object.keys(this.state.data)[this.state.index]]);

    }
    ////<tbody>{text[Object.keys(this.state.data)[this.state.index]].map((dynamicData, i) =>

    sumaTotalSoles() {
        let sumaTotalSoles = 0;
        let arr = this.state.data;
        arr.map((dynamicData, i) => {
            //console.log(arr);
            if (dynamicData.recibo !== 'SubSumaSoles') {
                if (dynamicData.moneda === "SOL")
                    sumaTotalSoles = sumaTotalSoles + parseFloat(dynamicData.importe);
            }
            return null;
        });
        return sumaTotalSoles;
    }

    sumaTotalDolares() {
        let sumaTotalDolares = 0;
        let arr = this.state.data;
        arr.map((dynamicData, i) => {
            //console.log(arr);
            if (dynamicData.recibo !== 'SubSumaDolares') {
                if (dynamicData.moneda === "DOL")
                    sumaTotalDolares = sumaTotalDolares + parseFloat(dynamicData.importe);
            }
            return null;
        });
        return sumaTotalDolares;
    }

    alterarArraySoles() {
        let suma = 0;
        let arr = this.state.dataAlterar;
        //console.log(arr);
        let arrHueco = [];
        let ant = arr[0].concepto;
        let i = 0;
        while (i < arr.length) {
            if (arr[i].moneda === 'SOL') {
                if (ant === arr[i].concepto) {

                    suma = suma + parseFloat(arr[i].importe);
                } else {
                    arr.splice(i, 0, [arrHueco]);
                    arr[i].importe = suma;
                    arr[i].recibo = 'Subsuma Soles';
                    i++;
                    ant = arr[i].concepto;
                    suma = 0;

                    suma = suma + parseFloat(arr[i].importe);

                }
            }
            i++;
        }
        arr.splice(i, 0, [arrHueco]);
        arr[i].importe = suma;
        arr[i].recibo = 'Subsuma Soles';
    }
    close() {
        this.setState({
            modal: false
        })
    }

    alterarArrayDolares() {
        let suma = 0;
        let arr = this.state.dataAlterar;
        //console.log(arr);
        let arrHueco = [];
        let ant = arr[0].concepto;
        let i = 0;
        while (i < arr.length) {
            if (ant === arr[i].concepto) {
                if (arr[i].moneda === "DOL") {
                    suma = suma + parseFloat(arr[i].importe);
                }
            } else {
                arr.splice(i, 0, [arrHueco]);
                arr[i].importe = suma;
                arr[i].recibo = 'Subsuma Dolares';
                i++;
                ant = arr[i].concepto;
                suma = 0;
                if (arr[i].moneda === "DOL") {
                    suma = suma + parseFloat(arr[i].importe);
                }
            }
            i++;
        }
        arr.splice(i, 0, [arrHueco]);
        arr[i].importe = suma;
        arr[i].recibo = 'Subsuma Dolares';
        //console.log(suma);
    }

    render() {
        this.alterarArrayDolares();
        this.alterarArraySoles();
        const text = this.state.dataAlterar;
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.close}>&times;</button>;
        let cont = 0;
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn} size={"lg"}>
                    <ModalHeader>
                        <Label>Nombre: {text[0].nombre}</Label>
                        <br></br>
                        <Label>Código: {text[0].codigo}</Label>
                    </ModalHeader>
                    <ModalBody>
                        <Table responsive>
                            <thead>
                                <tr className="tabla-cabecera">
                                    <th>Nro</th>
                                    <th>Concepto</th>
                                    <th>Recibo</th>
                                    <th>Moneda</th>
                                    <th>Importe</th>
                                    <th>Fecha</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{text.map((dynamicData, i) =>
                                <tr key={i}>
                                    {(dynamicData.recibo === "Subsuma Soles") ? (<td colSpan={1}></td>) :
                                        ((dynamicData.recibo === "Subsuma Dolares") ? (<td colSpan={1}></td>) : (<td>{cont += 1}</td>))}
                                    <td>{dynamicData.concepto}</td>
                                    {(dynamicData.recibo === "Subsuma Soles") ? (<td colSpan={1}>{dynamicData.recibo}</td>) :
                                        ((dynamicData.recibo === "SubSuma Dolares") ? (<td colSpan={1}>{dynamicData.recibo}</td>) : (<td>{dynamicData.recibo}</td>))}
                                    <td>{dynamicData.moneda}</td>
                                    {(dynamicData.recibo === "Subsuma Soles") ? (<td colSpan={1} className="subTotal">S/ {dynamicData.importe}</td>) :
                                        ((dynamicData.recibo === "Subsuma Dolares") ? (<td colSpan={1} className="subTotal">$/ {dynamicData.importe}</td>) : (<td>{dynamicData.mascara} {dynamicData.importe}</td>))}
                                    <td>{dynamicData.fecha}</td>
                                </tr>
                            )}
                                <tr>
                                    <td colSpan={3} >Total Dolares</td>
                                    <td className="total">$ {this.sumaTotalDolares()}</td>
                                </tr>
                                <tr >
                                    <td colSpan={3} >Total Soles</td>
                                    <td className="total">S/ {this.sumaTotalSoles()}</td>
                                </tr>

                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-primary" onClick={window.print} >Imprimir</button>
                        <Button color="secondary" onClick={this.close}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default MyModal;