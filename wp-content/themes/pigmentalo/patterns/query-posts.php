<?php
/**
 * Title: Listato Articoli
 * Slug: pigmentalo/query-posts
 * Block Types: core/query
 * Categories: posts
 * Description: Query loop con card standard: immagine, categoria, titolo, abstract.
 */
?>
<!-- wp:query {"queryId":1,"query":{"inherit":false,"postType":"post","perPage":4,"order":"desc","orderBy":"date"},"className":"posts-grid posts-grid--block"} -->
<div class="wp-block-query posts-grid posts-grid--block">

	<!-- wp:post-template -->
	<!-- wp:group {"className":"post-card","layout":{"type":"default"}} -->
	<div class="wp-block-group post-card post-card--light">
		<!-- wp:post-title {"isLink":true,"level":3,"className":"post-card__title"} /-->
		<!-- wp:post-terms {"term":"category","className":"post-card__category"} /-->
		<!-- wp:post-featured-image {"isLink":true} /-->
	</div>
	<!-- /wp:group -->
	<!-- /wp:post-template -->

	<!-- wp:query-no-results -->
	<!-- wp:paragraph -->
	<p>Nessun articolo trovato.</p>
	<!-- /wp:paragraph -->
	<!-- /wp:query-no-results -->

</div>
<!-- /wp:query -->
