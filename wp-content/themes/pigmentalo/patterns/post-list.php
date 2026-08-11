<?php
/**
 * Title: Listato Compatto
 * Slug: pigmentalo/post-list
 * Block Types: core/query
 * Categories: posts
 * Description: Query loop a colonna singola con card in stile lista numerata: numero, titolo, categoria, thumbnail.
 */
?>
<!-- wp:query {"queryId":2,"query":{"inherit":false,"postType":"post","perPage":5,"order":"desc","orderBy":"date"},"className":"posts-list"} -->
<div class="wp-block-query posts-list">

	<!-- wp:post-template {"layout":{"type":"default"}} -->
	<!-- wp:group {"className":"post-card post-card--list","layout":{"type":"default"}} -->
	<div class="wp-block-group post-card post-card--list">
		<!-- wp:post-terms {"term":"category","className":"post-card__category"} /-->
		<!-- wp:post-title {"isLink":true,"level":3,"className":"post-card__title"} /-->
		<!-- wp:post-featured-image {"isLink":true,"aspectRatio":"1"} /-->
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
