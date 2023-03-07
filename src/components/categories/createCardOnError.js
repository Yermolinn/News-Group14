import imageErrorX1 from '../../images/img-error-x1.png';
import imageErrorX2 from '../../images/img-error-x2.png';
import imageErrorTabletX1 from '../../images/img-error-tablet-x1.png';
import imageErrorTabletX2 from '../../images/img-error-tablet-x2.png';
import imageErrorMobileX1 from '../../images/img-error-mobile-x2.png';
import imageErrorMobileX2 from '../../images/img-error-mobile-x2.png';

export function createCardOnError(tittleText) {
  return `
  <div class="container container-error">
      <h2 class="error-func">We haven’t found news from this ${tittleText}</h2>
  <picture class="error-picture">
	<source
     srcset="
      ${imageErrorMobileX1} 1x,
      ${imageErrorMobileX2} 2x
       "
     media="(max-width: 767px)"
   />
   <source
     srcset="
        ${imageErrorTabletX1} 1x,
        ${imageErrorTabletX2} 2x
       "
     media="(max-width: 1279px)"
   />
   <source
     srcset="
			${imageErrorX1} 1x,
		 	${imageErrorX2} 2x"
     media="(min-width: 1280px)"
   />
        <img src="${imageErrorX1}" alt="Error" width="601"/>
	</picture>
    </div>
	 
	`;
}
