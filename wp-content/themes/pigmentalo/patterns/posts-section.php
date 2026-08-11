<?php
/**
 * Title: Sezione Articoli - gli ultimi sei
 * Slug: pigmentalo/posts-section
 * Categories: posts, featured
 * Description: Sezione completa con titolo, descrizione, link al listato e griglia 3×2 articoli.
 */
?>
<?php
$posts_url = get_option( 'page_for_posts' )
    ? get_permalink( get_option( 'page_for_posts' ) )
    : home_url( '/' );
?>
<!-- wp:group {"className":"posts-section"} -->
<section class="wp-block-group posts-section">
	<!-- wp:heading {"level":2,"className":"posts-section__title"} -->
	<h2 class="wp-block-heading posts-section__title">Notizie</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"className":"posts-section__description"} -->
	<p class="posts-section__description">Descrizione della sezione articoli.</p>
	<!-- /wp:paragraph -->

	<!-- wp:buttons {"className":"posts-section__more"} -->
	<div class="wp-block-buttons posts-section__more">
		<!-- wp:button {"url":"<?php echo esc_url( $posts_url ); ?>","className":"is-style-text-link"} -->
		<div class="wp-block-button is-style-text-link"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url( $posts_url ); ?>">Leggi tutto</a></div>
		<!-- /wp:button -->
	</div>
	<!-- /wp:buttons -->

	<!-- wp:query {"queryId":2,"query":{"inherit":false,"postType":"post","perPage":6,"order":"desc","orderBy":"date"},"className":"posts-grid"} -->
	<div class="wp-block-query posts-grid">
		<!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
		<!-- wp:group {"className":"post-card","layout":{"type":"default"}} -->
		<article class="wp-block-group post-card">
			<!-- wp:post-featured-image {"isLink":true,"aspectRatio":"4/3"} /-->
			<!-- wp:group {"className":"post-card__body","layout":{"type":"default"}} -->
			<div class="wp-block-group post-card__body">
				<!-- wp:post-terms {"term":"category","className":"post-card__category"} /-->
				<!-- wp:post-title {"isLink":true,"level":3,"className":"post-card__title"} /-->
				<!-- wp:post-excerpt {"moreText":"","className":"post-card__excerpt"} /-->
			</div>
			<!-- /wp:group -->
		</article>
		<!-- /wp:group -->
		<!-- /wp:post-template -->

		<!-- wp:query-no-results -->
		<!-- wp:paragraph -->
		<p>Nessun articolo trovato.</p>
		<!-- /wp:paragraph -->
		<!-- /wp:query-no-results -->

	</div>
	<!-- /wp:query -->

</section>
<!-- /wp:group -->
