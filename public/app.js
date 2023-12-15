class Formulario {
  _listaDeFormularios = JSON.parse(localStorage.getItem('listaDeFormularios')) || []
  constructor (email = '', mensaje = '', topic = '') {
    this.email = email
    this.mensaje = mensaje
    this.topic = topic
    this.checkboxes = []
  }

  agregarFormulario () {
    // this._listaDeFormularios.push({email: this.email, mensaje: this.mensaje});
    // localStorage.setItem('listaDeFormularios', JSON.stringify(this._listaDeFormularios));
    if (this.email && this.mensaje && this.topic) {
      // Solo agrega el formulario si tanto el email como el mensaje están presentes
      this._listaDeFormularios.push({ email: this.email, mensaje: this.mensaje, topic: this.topic, checkboxes: this.checkboxes })
      localStorage.setItem('listaDeFormularios', JSON.stringify(this._listaDeFormularios))
    } else {
      alert('Por favor, complete tanto el campo de email como el campo de mensaje antes de enviar el formulario.')
    }
  }

  get listaDeFormularios () {
    return this._listaDeFormularios
  }

  set listaDeFormularios (listaDeFormularios) {
    this._listaDeFormularios = listaDeFormularios
  }
}
function mostrarSiguienteFormulario (formId) {
  // Oculta todos los formularios
  document.querySelectorAll('.form-container').forEach(form => {
    form.classList.remove('visible')
  })
  // Muestra el formulario siguiente
  document.getElementById(formId).classList.add('visible')
}
const formOptions = {
  email: '',
  mensaje: '',
  topic: '',
  checkboxes: ['c']
}
// ==================Inputs y Validacion en el PRIMER formulario================
const inputEmail = document.getElementById('exampleInputEmail1')
// Validacion del input de email
inputEmail.addEventListener('input', (e) => {
  if (inputEmail.validity.valid) {
    inputEmail.classList.remove('is-invalid')
    inputEmail.classList.add('is-valid')
  } else {
    inputEmail.classList.remove('is-valid')
    inputEmail.classList.add('is-invalid')
  }
})

const inputPassword = document.getElementById('exampleInputPassword1')
inputPassword.addEventListener('input', (e) => {
  if (e.target.value === '') {
    e.target.classList.add('is-invalid')
    e.target.classList.remove('is-valid')
  } else {
    e.target.classList.add('is-valid')
    e.target.classList.remove('is-invalid')
  }
}
)

const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
  if (inputEmail.classList.contains('is-invalid') || inputEmail.classList.contains('is-invalid')) {
    console.log('Por favor, complete todos los campos antes de continuar.')
  } else {
    formOptions.email = inputEmail.value
    formOptions.mensaje = inputPassword.value
    mostrarSiguienteFormulario('form2')
  }
})

// =========Seleccion de boton en el SEGUNDO formulario==============
const allButtons = document.querySelectorAll('.option')
const btn2 = document.getElementById('btn2')
allButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    allButtons.forEach(btn => {
      btn.classList.remove('selected')
    })
    btn.classList.add('selected')
    btn2.classList.remove('disabled')
  })
})

btn2.addEventListener('click', () => {
  if (document.querySelector('.selected')) {
    formOptions.topic = document.querySelector('.selected').innerHTML
    mostrarSiguienteFormulario('form3')
  } else {
    alert('Por favor, seleccione una opción antes de continuar.')
  }
})

// =========Envio de formulario en el TERCER formulario==============
const checkboxOptins = ['JavaScript', 'Java', 'Python', 'PHP', 'C++', 'C#', 'TypeScript', 'Ruby', 'Swift', 'Objective-C', 'Kotlin', 'Go', 'Rust']

const opciones = document.getElementById('opciones')
checkboxOptins.forEach(option => {
  opciones.innerHTML += `
  <div class="form-check">
    <input class="form-check-input checkbox" type="checkbox" value="" id="defaultCheck1">
    <label class="form-check-label" for="defaultCheck1">
      ${option}
    </label>
  </div>
  `
})
// Quiero guardar las opciones seleccionadas en this.checkboxes
// tengo que comprobar que por lo menos un checkbox este seleccionado
const allCheckboxes = document.querySelectorAll('.checkbox')
console.log(allCheckboxes)
const btnSend = document.getElementById('btnSend')
allCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('click', () => {
    checkbox.classList.toggle('checked')
    btnSend.classList.remove('disabled')
  })
}
)
btnSend.addEventListener('click', () => {
  if (document.querySelector('.checked')) {
    allCheckboxes.forEach(checkbox => {
      if (checkbox.classList.contains('checked')) {
        formOptions.checkboxes.push(checkbox.innerHTML)
      }
    })
    const formulario = new Formulario(formOptions.email, formOptions.mensaje, formOptions.topic, formOptions.checkboxes)
    formulario.agregarFormulario()
    console.log(formulario.listaDeFormularios)
    alert('Formulario enviado con éxito.')
  } else {
    alert('Por favor, seleccione al menos una opción antes de continuar.')
  }
})
