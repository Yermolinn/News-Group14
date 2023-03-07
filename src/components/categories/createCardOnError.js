export function createCardOnError(tittleText) {
  return `
  <div class="container container-error">
      <h2 class="error-func">We haven’t found news from this ${tittleText}</h2>
   <picture class="error-picture">
  <source
    srcset="
         ../images/img-error-mobile-x1.png 1x,
         ../images/img-error-mobile-x2.png 2x
       "
    media="(max-width: 767px)"
  />
  <source
    srcset="
         ../images/img-error-tablet-x1.png 1x,
        ../images/img-error-tablet-x2.png 2x
       "
    media="(max-width: 1279px)"
  />
  <source
    srcset="
			../images/img-error-x1.png 1x,
		 	../images/img-error-x1.png 2x"
    media="(min-width: 1280px)"
  />
        <img src="../images/img-error-x1.png" alt="Error" width="601" height="478"/>
    </div>
	 </picture>
	`;
}
