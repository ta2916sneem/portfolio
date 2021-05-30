const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {

    container: {
      center: true,
      padding: "1.5rem",
    },

    // customForms: theme => ({
    //   dark: {
    //     'input, textarea, multiselect, checkbox, radio': {
    //       backgroundColor: theme('colors.gray.900'),
    //       border: theme('colors.transparent'),
    //       '&:focus': {
    //         boxShadow: `none`,
    //       },
    //     },
    //     select: {
    //       backgroundColor: theme('colors.gray.600'),
    //
    //     },
    //   },
    //   sm: {
    //     'input, textarea, multiselect, select': {
    //       fontSize: theme('fontSize.sm'),
    //       padding: `${theme('spacing.1')} ${theme('spacing.2')}`,
    //     },
    //     select: {
    //       paddingRight: `${theme('spacing.4')}`,
    //     },
    //     'checkbox, radio': {
    //       width: theme('spacing.3'),
    //       height: theme('spacing.3'),
    //     },
    //   }
    // }),


    extend: {
      colors: {
        trueGray: colors.trueGray,
        magenta: "#D9AFD9",
        greenGray: "#37474F"
      },

      backgroundColor: theme => ({
        ...theme('colors'),
        'greenGray': "#37474F"
      }),

      spacing: {
        '72': '18rem',
        '80': '20rem'
      },

      fontFamily: {
        balsamiq: ['Balsamiq Sans'],
        montserrat: ['Montserrat']
      },

      fontSize: {
        xxs: '.675rem'
      },

      boxShadow: {
        drop: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
        mdBlue: '0 4px 6px -1px rgba(43, 108, 176, 0.1), 0 2px 4px -1px rgba(43, 108, 176, 0.3)',
        xlBlue: '0 20px 25px 5px rgba(43, 108, 176, 0.1), 0 10px 10px 5px rgba(43, 108, 176, 0.5)',
        lgBlue: '0 10px 15px 3px rgba(43, 108, 176, 0.01), 0 4px 6px 2px rgba(43, 108, 176, 0.05)',
        mdPurpleCenter: '0 0 6px 3px rgba(102, 126, 234, 0.2)',
        mdOrangeCenter: '0 0 6px 3px rgba(237, 137, 54, 0.5)',
        mdIndigoCenter: '0 0 6px 3px rgba(102, 126, 234, 0.5)',
        mdBlueCenter: '0 0 6px 4px rgba(66, 153, 225, 0.5)',
        mdGrayCenter: '0 0 6px 4px rgba(0, 0, 0, 0.2)',
        mdGreenCenter: '0 0 6px 4px rgba(72, 187, 120, 0.5)',
        mdYellowCenter: '0 0 6px 4px rgba(236, 201, 75, 0.5)',
        mdRedCenter: '0 0 6px 4px rgba(245, 101, 101, 0.5)',
        lgPurpleCenter: '0 0 15px 4px rgba(102, 126, 234, 0.7)',
        lgOrangeCenter: '0 0 15px 4px rgba(237, 137, 54, 0.7)',
        lgIndigoCenter: '0 0 15px 4px rgba(102, 126, 234, 0.7)',
        lgBlueCenter: '0 0 15px 4px rgba(66, 153, 225, 0.7)',
        lgGrayCenter: '0 0 15px 4px rgba(0, 0, 0, 0.3)',
        lgGreenCenter: '0 0 15px  4px rgba(72, 187, 120, 0.7)',
        lgYellowCenter: '0 0 15px 4px rgba(236, 201, 75, 0.7)',
        lgRedCenter: '0 0 15px 4px rgba(245, 101, 101, 0.5)',
        cell: '0 0 8px -1px rgba(0, 0, 0, 0.2)'
      }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/custom-forms'),
  ],
}
