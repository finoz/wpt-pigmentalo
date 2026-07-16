<?php
/**
 * Pigmentalo — child theme di Ficus
 */

defined( 'ABSPATH' ) || exit;

add_action( 'wp_enqueue_scripts', function () {
    ficus_enqueue_assets(
        get_stylesheet_directory(),
        get_stylesheet_directory_uri(),
        wp_get_theme()->get( 'Version' )
    );
} );

add_action( 'after_setup_theme', function () {
    new Ficus_GitHub_Updater(
        'pigmentalo',
        'finoz/wpt-pigmentalo',
        wp_get_theme()->get( 'Version' )
    );
} );
