var additems = [
{
  label: 'Boards',
  icon : 'menu_boards.svg',
  submenu : [
    {
      label: "Arduino UNO",
      icon: 'menu_uno.svg',
      action: 'menu_uno()',
    },
    {
      label: "Arduino Leonardo",
      icon: 'menu_leonardo.svg',
      action: 'menu_leno()'
    },
  ]
},
{
  label: 'Sensors',
  icon : 'menu_sensors.svg',
  submenu : [
    {
      label: "Potentiometer",
      icon: 'menu_pot.svg',
      action: 'menu_pot()',
    },
    {
      label: "Piezo Sensor",
      icon: 'menu_piezo.svg',
      action: 'menu_knock()',
    },
  ]
},
{
  label: 'Actuators',
  icon : 'menu_actuators.svg',
  submenu : [
    {
      label: "LED",
      icon: 'menu_led.svg',
      action: 'menu_led()',
    },
    {
      label: "RGB LED",
      icon: 'menu_rgbled.svg',
      action: 'menu_rgbled()',
    },
    {
      label: "LED Matix",
      icon: 'menu_ledmatrix.svg',
      action: 'menu_ledmatrix()',
    },
    {
      label: "Piezo Speaker",
      icon: 'menu_piezo.svg',
      action: 'menu_piezo()',
    },
    {
      label: "Servo",
      icon: 'menu_servo.svg',
      action: 'menu_servo()',
    },
    {
      label: "Solenoid",
      icon: 'menu_solenoid.svg',
      action: 'menu_solenoid()',
    },
  ]
},
{
  label: 'Controls',
  icon : 'menu_controls.svg',
  submenu : [
    {
      label: "If",
      icon: 'menu_if.svg',
      action: 'menu_if()',
    },
    {
      label: "For Loop",
      icon: 'menu_forloop.svg',
      action: 'menu_forloop()',
    },
    {
      label: "Sequence",
      icon: 'menu_sequence.svg',
      action: 'menu_sequence()',
    },
    {
      label: "Slider",
      icon: 'menu_slider.svg',
      action: 'menu_slider()',
    },
    {
      label: "Toggle",
      icon: 'menu_toggle.svg',
      action: 'menu_toggle()',
    },
    // {
    //   label: "Timer",
    //   icon: 'menu_timer.svg',
    //   action: 'menu_timer()',
    // },
  ]
},
{
  label: 'Number & Data',
  icon : 'menu_datatypes.svg',
  submenu : [
    {
      label: "Boolean",
      icon: 'menu_boolean.svg',
      action: 'menu_boolean()',
    },
    {
      label: "Integer",
      icon: 'menu_int.svg',
      action: 'menu_integer()',
    },
    {
      label: "Array",
      icon: 'menu_array.svg',
      action: 'menu_array()',
    },
  ]
},
{
  label: 'Operators',
  icon : 'menu_operators.svg',
  submenu : [
    {
      label: "+",
      icon: 'menu_addition.svg',
      action: 'menu_addition()',
      half: true
    },
    {
      label: "-",
      icon: 'menu_subtraction.svg',
      action: 'menu_subtraction()',
      half: true
    },
    {
      label: "*",
      icon: 'menu_multiplication.svg',
      action: 'menu_multiplication()',
      half: true
    },
    {
      label: "/",
      icon: 'menu_division.svg',
      action: 'menu_division()',
      half: true
    },
    {
      label: "%",
      icon: 'menu_modulo.svg',
      action: 'menu_modulo()',
      half: true
    },
    {
      label: "==",
      icon: 'menu_equal.svg',
      action: 'menu_equal()',
      half: true
    },
    {
      label: "!=",
      icon: 'menu_notequal.svg',
      action: 'menu_notequal()',
      half: true
    },
    {
      label: "<",
      icon: 'menu_smaller.svg',
      action: 'menu_smaller()',
      half: true
    },
    {
      label: ">",
      icon: 'menu_bigger.svg',
      action: 'menu_bigger()',
      half: true
    },
    {
      label: "<=",
      icon: 'menu_smallerequal.svg',
      action: 'menu_smallerequal()',
      half: true
    },
    {
      label: ">=",
      icon: 'menu_biggerequal.svg',
      action: 'menu_biggerequal()',
      half: true
    },
    {
      label: "&&",
      icon: 'menu_and.svg',
      action: 'menu_and()',
      half: true
    },
    {
      label: "||",
      icon: 'menu_or.svg',
      action: 'menu_or()',
      half: true
    },
    {
      label: "!",
      icon: 'menu_not.svg',
      action: 'menu_not()',
      half: true
    },
  ]
},
{
  label: 'Math',
  icon : 'menu_math.svg',
  submenu : [
    {
      label: "min",
      icon: 'menu_min.svg',
      action: 'menu_min()',
      half: true
    },
    {
      label: "max",
      icon: 'menu_max.svg',
      action: 'menu_max()',
      half: true
    },
    {
      label: "abs",
      icon: 'menu_abs.svg',
      action: 'menu_abs()',
      half: true
    },
    {
      label: "pow",
      icon: 'menu_pow.svg',
      action: 'menu_pow()',
      half: true
    },
    {
      label: "sqrt",
      icon: 'menu_sqrt.svg',
      action: 'menu_sqrt()',
      half: true
    },
    {
      label: "sin",
      icon: 'menu_sin.svg',
      action: 'menu_sin()',
      half: true
    },
    {
      label: "cos",
      icon: 'menu_cos.svg',
      action: 'menu_cos()',
      half: true
    },
    {
      label: "tan",
      icon: 'menu_tan.svg',
      action: 'menu_tan()',
      half: true
    },
    {
      label: "Constrain",
      icon: 'menu_constrain.svg',
      action: 'menu_constrain()',
    },
    {
      label: "Map",
      icon: 'menu_map.svg',
      action: 'menu_map()',
    },
    {
      label: "Random",
      icon: 'menu_random.svg',
      action: 'menu_random()',
    },
  ]
},
{
  label: 'Functions',
  icon : 'menu_functions.svg',
  submenu : [
    {
      label: "Log",
      icon: 'menu_log.svg',
      action: 'menu_log()',
    },
    {
      label: "Blink",
      icon: 'menu_blink.svg',
      action: 'menu_blink()',
    },
    {
      label: "Color Picker",
      icon: 'menu_colorpicker.svg',
      action: 'menu_colorpicker()',
    },
    {
      label: "Recorder",
      icon: 'menu_recorder.svg',
      action: 'menu_recorder()',
    },
  ]
},
{
  label: 'Phone',
  icon : 'menu_phone.svg',
  submenu : [
    {
      label: "Phone:Block",
      icon: 'menu_phoneblock.svg',
      action: 'menu_phoneblock()',
    },
    {
      label: "Phone:Slider",
      icon: 'menu_phoneslider.svg',
      action: 'menu_phoneslider()',
    },
    {
      label: "Phone:Led Matrix",
      icon: 'menu_phonematrix.svg',
      action: 'menu_phoneledmatrix()',
    },
  ]
},
{
  label: 'Note',
  icon : 'menu_note.svg',
  action: 'menu_note()'
},
];

var modules = [
    { value: 'Arduino Leonardo', data: 'menu_leonardo' },
    { value: 'Arduino UNO', data: 'menu_uno' },
    { value: 'min', data: 'menu_min' },
    { value: 'max', data: 'menu_max' },
    { value: 'abs', data: 'menu_abs' },
    { value: 'sqrt', data: 'menu_sqrt' },
    { value: 'pow', data: 'menu_pow' },
    { value: 'sin', data: 'menu_sin' },
    { value: 'cos', data: 'menu_cos' },
    { value: 'tan', data: 'menu_tan' },
    { value: 'Constrain', data: 'menu_constrain' },
    { value: 'Map', data: 'menu_map' },
    { value: 'Random', data: 'menu_random' },
    { value: 'addition', data: 'menu_addition' },
    { value: 'subtraction', data: 'menu_subtraction' },
    { value: 'multiplication', data: 'menu_multiplication' },
    { value: 'division', data: 'menu_division' },
    { value: 'modulo', data: 'menu_modulo' },
    { value: 'equal to', data: 'menu_equal' },
    { value: 'not equal to', data: 'menu_notequal' },
    { value: 'less than', data: 'menu_smaller' },
    { value: 'greater than', data: 'menu_bigger' },
    { value: 'less than or equal to', data: 'menu_smallerequal' },
    { value: 'greater than or equal to', data: 'menu_biggerequal' },
    { value: 'and', data: 'menu_and' },
    { value: 'or', data: 'menu_or' },
    { value: 'not', data: 'menu_not' },
    { value: 'If', data: 'menu_if' },
    { value: 'For Loop', data: 'menu_forloop' },
    { value: 'Slider', data: 'menu_slider' },
    { value: 'Toggle', data: 'menu_toggle' },
    // { value: 'Timer', data: 'menu_timer' },
    { value: 'Note', data: 'menu_note' },
    { value: 'Log', data: 'menu_log' },
    { value: 'Blink', data: 'menu_blink' },
    { value: 'Color Picker', data: 'menu_colorpicker' },
    { value: 'Recorder', data: 'menu_recorder' },
    { value: 'Boolean', data: 'menu_boolean' },
    { value: 'Integer', data: 'menu_integer' },
    { value: 'Array', data: 'menu_array' },
    { value: 'Solenoid', data: 'menu_solenoid' },
    { value: 'Sequence', data: 'menu_sequence'},
    { value: 'Servo', data: 'menu_servo'},
];
